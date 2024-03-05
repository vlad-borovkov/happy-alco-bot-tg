const Locale = require("./locale/index");
const mongoose = require("mongoose/index");
const {setupBot} = require("./bot");
const schedule = require("node-schedule");
require('dotenv').config({path: './config/.env'});
const {NODE_ENV, MONGO_ADR} = process.env;

(async function () {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(NODE_ENV === 'dev' ? MONGO_ADR : MONGO_ADR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'alco-birthday'
        }); // даём знать мангусту где наша БД пока без адреса prod
        // запустить бот c настройками
        await setupBot()
            .launch()
            .then((ctx) => console.log('бот запущен'))
        
    } catch (e) {
        console.log('Ошибка запуска', e)
    }
}())


// Обработчик для проверки дней рождения участников
// bot.hears(['ДР', 'день рождения'], (ctx) => {
//     console.log('проверка дат с ДР')
//     const birthdayPeople = getBirthdayPeople();
//
//     if (birthdayPeople.length === 0) {
//         ctx.reply('Сегодня нет празднующих день рождения.');
//     } else {
//         ctx.reply('Сегодня поздравляем с днем рождения:');
//         birthdayPeople.forEach((person) => {
//             ctx.reply(`🎉 ${person}`);
//         });
//         const chatId = GROUP_CHAT_ID;
//         const message = `🎉 Сегодня поздравляем с днем рождения: ${birthdayPeople.join(', ')}`;
//         bot.telegram.sendMessage(chatId, message);
//     }
// });
//


// function getBirthdayPeople() {
//     return ['Имя1', 'Имя2'];
// }
