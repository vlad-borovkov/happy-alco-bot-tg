const {Telegraf, Scenes} = require("telegraf");
const {session} = require("telegraf-session-mongoose")
const {start, backMenu, startWhatWeather} = require("./controllers/commands");
const {CMD_BUTTONS} = require("./config/constans");
const {weatherScene} = require("./controllers/whetherScene");
require('dotenv').config({path: './config/.env'});
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
// создаём сцену - изолированное пространство имён,
// которое требует веб-хуки. в метод Stage передаётся массив сцен.
const stage = new Scenes.Stage([weatherScene])
const setupBot = () => {
    // для хранения сессий в монго
    bot.use(session({collectionName: 'sessions'}))
    // стейдж миддлвэйрина для обратки сцен
    bot.use(stage.middleware())

    bot.use((ctx, next) => {
        // хранит контекст сесси каждого пользователя. пока не нужно, но вдруг пригодиться.

        return next()
    })
    bot.start(start);
    // служит для прослушки текствовых сообщений
    bot.hears(CMD_BUTTONS.menu, backMenu);
    bot.hears(CMD_BUTTONS.whatWeather, startWhatWeather);
    return bot
}

module.exports = {
    setupBot
}