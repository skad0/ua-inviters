import { Context, MiddlewareFn, Telegraf } from "telegraf";
import type { Update } from "telegraf/typings/core/types/typegram";

interface SessionData {
    messageCount: number
    refugeeData: RefugeeData
    currentQuestion?: number;
}

interface SessionContext extends Context {
    session?: SessionData
}

const sessionStore = new Map<number, any>();

function SessionMiddleware(options?: any): MiddlewareFn<Context<Update>> {
    return async (ctx: SessionContext, next) => {
        const fromId = ctx.from?.id
        let session = sessionStore.get(fromId);
        if (!session) {
            session = { messageCount: 0, refugeeData: {} };
            sessionStore.set(fromId, session);
        }

        ctx.session = session;

        next();
    }
}


interface RefugeeData {
    name?: string
    number_of_people?: string
    location?: string
    contact_info?: string
}
interface Question {
    name: string;
    message: string;
    validator?: (input: string) => boolean;
}

interface Questionnaire {
    questions: Question[];
}

const refugeeQuestionnaire: Questionnaire = {
    questions: [
        {
            name: "name",
            message: "Укажите ваше имя",
        },
        {
            name: "number_of_people",
            message: "Сколько человек поедет с вами в Израиль?",
        },
        {
            name: "location",
            message: "Где вы находитесь сейчас?",
        },
        {
            name: "contact_info",
            message: "Как с вами связаться?"
        }
    ]
}

const caretakerQuestionnaire: Questionnaire = {
    questions: [

    ]
}

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(SessionMiddleware());

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

bot.launch()

bot.on('message', (ctx: SessionContext) => {
    const session = ctx?.session;
    session.messageCount++;

    // ctx.reply(`messages sent: ${session.messageCount}`);

    const questions = refugeeQuestionnaire.questions;

    if (session.currentQuestion == undefined) {
        session.currentQuestion = 0;
        return ctx.reply(questions[0].message);
    } else {
        const currentQuestion = questions[session.currentQuestion];
        const refugeeData = session.refugeeData;
        refugeeData[currentQuestion.name] = (<any>ctx.message).text;

        console.log(ctx.session)

        const nextQuestion = session.currentQuestion + 1;
        if (nextQuestion < questions.length) {
            session.currentQuestion = nextQuestion;
            return ctx.reply(questions[nextQuestion].message);
        } else {
            const formatted = questions.map(q => {
                return `${q.message}\n${refugeeData[q.name]}`
            }).join('\n');

            return ctx.reply(`Анкета заполнена:\n${formatted}`)
        }
    }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
