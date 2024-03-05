const {Telegraf, Scenes} = require("telegraf");
const {session} = require("telegraf-session-mongoose")
const {
    start,
    backMenu,
    startAdminOperations
} = require("./controllers/commands");
const {CMD_BUTTONS} = require("./config/constans");
const {weatherScene} = require("./controllers/whetherScene");
const {adminOperations} = require("./controllers/adminOperationsScene");
const schedule = require("node-schedule");
require('dotenv').config({path: './config/.env'});
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
// создаём сцену - изолированное пространство имён,
// которое требует веб-хуки. в метод Stage передаётся массив сцен.

const stage = new Scenes.Stage([weatherScene, adminOperations])
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
    bot.hears(CMD_BUTTONS.menu, backMenu);
    //bot.hears(CMD_BUTTONS.whatWeather, startWhatWeather);

    // Запуск расписания TODO: включение по команде от админа
    // schedule.scheduleJob('* * * * *', () => {
    //     console.log('scheduleJob')
    //     // const chatId = GROUP_CHAT_ID; //раскоментить, когда будет готов
    //     const message = 'Проверка расписания';
    //     bot.telegram.sendMessage('134167611', message);
    // });

    return bot
}

module.exports = {
    setupBot
}