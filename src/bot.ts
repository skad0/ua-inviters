import { Context, MiddlewareFn, Telegraf } from "telegraf";
import type { Update } from "telegraf/typings/core/types/typegram";
import { RefugeeData, RefugeeQuestionnaire } from "./model";
import db from "./db/db";
import type { Knex } from "knex";

interface SessionData {
    refugeeData: RefugeeData
    knex?: Knex
}

interface SessionContext extends Context {
    session?: SessionData
}

function SessionMiddleware(options: { sessionStore: Map<number, any> }): MiddlewareFn<Context<Update>> {
    const { sessionStore } = options;

    return async (ctx: SessionContext, next) => {
        const fromId = ctx.from?.id
        let session = sessionStore.get(fromId);
        if (!session) {
            session = { refugeeData: {} };
            sessionStore.set(fromId, session);
        }

        ctx.session = session;

        next();
    }
}

function DBSessionMiddleware(options: { sessionStore: Knex }): MiddlewareFn<Context<Update>> {
    const { sessionStore: knex } = options;

    return async (ctx: SessionContext, next) => {
        const fromId = ctx.from?.id;
        const username = ctx.from?.username;

        const count = await knex('refugees').where({ tg_id: fromId }).count().first();
        console.log(count);

        if (Number(count.count) == 0) {
            await knex('refugees').insert({ tg_id: fromId, tg_login: username });
        } else {
            
        }

        const refugee = await knex('refugees').first('*').where({ tg_id: fromId});
        const session = { refugeeData: refugee, knex: knex };
        ctx.session = session;

        console.log(session);
        next();
    }
}

function initBot(bot: Telegraf, middleware: MiddlewareFn<Context>) {
    bot.use(middleware);

    bot.start((ctx) => ctx.reply('Welcome'));
    // bot.help((ctx) => ctx.reply('Send me a sticker'));
    // bot.on('sticker', (ctx) => ctx.reply('👍'));
    // bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    
    bot.launch()
    
    bot.on('message', async (ctx: SessionContext) => {
        const session = ctx?.session;
        const { refugeeData, knex } = session;
        const questions = RefugeeQuestionnaire.questions;
    
        if (refugeeData.current_question == undefined) {
            refugeeData.current_question = 0;
            await knex('refugees').update({ current_question: refugeeData.current_question}).where({ tg_id: refugeeData.tg_id });

            return ctx.reply(questions[0].message);
        } else {
            const currentQuestion = questions[refugeeData.current_question];
            
            const input = (<any>ctx.message).text;
            let value = input;

            if (currentQuestion.parse) {
                value = currentQuestion.parse(value);
            }

            if (currentQuestion.validate && !currentQuestion.validate(value)) {
                return ctx.reply(`Не можем распознать ваш ввод, попробуйте ответить еще раз.`)
            }

            refugeeData[currentQuestion.name] = value;
            console.log(ctx.session)
    
            const nextQuestion = refugeeData.current_question + 1;
            await knex('refugees').update(refugeeData).where({ tg_id: refugeeData.tg_id });

            if (nextQuestion < questions.length) {
                refugeeData.current_question = nextQuestion;    
                await knex('refugees').update({ current_question: refugeeData.current_question}).where({ tg_id: refugeeData.tg_id });

                return ctx.reply(questions[nextQuestion].message);
            } else {
                const formatted = questions.map(q => {
                    return `${q.message}\n${refugeeData[q.name]}`
                }).join('\n');
    
                return ctx.reply(`Анкета заполнена:\n${formatted}`)
            }
        }
    });    
}

async function main() {
    try {
        await db.migrate.latest();

        const bot = new Telegraf(process.env.BOT_TOKEN);
        //     const sessionStore = new Map<number, any>();
        // const sessionMiddleware = SessionMiddleware({ sessionStore: sessionStore })
        const sessionMiddleware = DBSessionMiddleware({ sessionStore: db });

        initBot(bot, sessionMiddleware);

        // Enable graceful stop
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

main();
