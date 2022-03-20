import { Context, MiddlewareFn, Telegraf } from "telegraf";
import type { Update } from "telegraf/typings/core/types/typegram";

interface SessionData {
    messageCount: number
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
            session = { messageCount: 0 };
            sessionStore.set(fromId, session);
        }

        ctx.session = session;

        next();
    }
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

    ctx.reply(`messages sent: ${session.messageCount}`);
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
