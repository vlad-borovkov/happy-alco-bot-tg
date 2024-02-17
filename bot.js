const {Telegraf, session} = require("telegraf");
const {start} = require("./controllers/commands");
require('dotenv').config({path: './config/.env'});
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const setupBot = () => {
    // хранит контекст сесси каждого пользователя. пока не нужно, но вдруг пригодиться.
    bot.use((ctx, next) => {
        session()
        return next()
    })
    bot.start(start);

    return bot
}

module.exports = {
    setupBot
}