const {Telegraf, Scenes} = require("telegraf");
const {session} = require("telegraf-session-mongoose");
const {start, startAdminOperations} = require("./controllers/commands");
const {CMD_BUTTONS} = require("./config/constans");
const {adminScene} = require("./controllers/adminOperationsScene");
const {scheduleBirthdayScene} = require("./controllers/schedulBirthday")
const schedule = require("node-schedule");
const {deleteBirthdayScene} = require("./controllers/deleteBirthday");
const {addBirthdayScene} = require("./controllers/addBirthday");
require('dotenv').config({path: './config/.env'});
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
// создаём сцены - изолированное пространство имён,
// которое требует веб-хуки. в метод Stage передаётся массив сцен.
const stage = new Scenes.Stage([adminScene, scheduleBirthdayScene, addBirthdayScene, deleteBirthdayScene])
const setupBot = () => {
    // для хранения сессий в монго
    bot.use(session({collectionName: 'sessions'}))
    // стейдж миддлвэйрина для обратки сцен
    bot.use(stage.middleware())

    bot.use((ctx, next) => {
        return next()
    })

    bot.start(start);

    bot.hears(CMD_BUTTONS.adminPanel, startAdminOperations);

    return bot
}

module.exports = {
    setupBot
}