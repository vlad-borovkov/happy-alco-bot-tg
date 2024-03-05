const Locale = require("../locale");
const {mainMenu, adminOperations} = require("../utils/buttons");
const {getAllBirthdays, getNearBirthdays} = require("./db/birthdays");
const {allBirthdaysToString, getSortedBirthday} = require("../utils/filters");
const start = (ctx) => {
    ctx.reply(`${ctx.message.from.username}, ${Locale.get('hello')}`, {
        ...mainMenu
    });

    console.log('</ Бот успешно запущен>');
}
const backMenu = (ctx) => {
    // отвечаем текстом и показываем массив с кнопками,
    // при нажатии на них улетит ответ боту
    ctx.reply('Ты в меню', {
        ...mainMenu
    })
}

const startAdminOperations = (ctx) => {
    console.log('AdminOperations');
    ctx.reply('Выбери действие', {
        ...adminOperations
    })
    return ctx.scene.enter('adminOperations')
}

const showAllBirthdays = (ctx) => {
    // получить из БД все ДР, отформатировать для сообщения, ответить сообщением и клавиатурой
    getAllBirthdays()
        .then((birthdays) => getSortedBirthday(birthdays))
        .then((birthdays) => allBirthdaysToString(birthdays))
        .then((birthdays) => ctx.reply(`Смотри что нашёл: \n ${birthdays}`))
        .catch((e) => console.log('Ошибка при отображении ДР', e))
}
const showNearBirthdays = (ctx) => {
    getNearBirthdays()
        .then((birthdays) => allBirthdaysToString(birthdays))
        .then((birthdays) => ctx.reply(`Смотри что нашёл: \n ${birthdays}`))
        .catch((e) => console.log('Ошибка при отображении ДР', e))
}
const ping = (ctx) => {
    ctx.reply('Проверка расписания')
}
// команда для входа в сцену Base
const startWhatWeather = (ctx) => {
    // вызов сцены по ID
    return ctx.scene.enter('weather')
}
// const help = (ctx) => {
// // вызывает клавиутуру телеграмма с кнопками-командами
//     console.log(`текущая локаль у пользователя: ${ctx.message.from.id} ${ctx.message.from.username} ----> ${Locale.getCurrentLocale()}`)
//     ctx.sendChatAction('typing')
//         .then(() => {
//             ctx.reply(`${ctx.message.from.first_name}, ${Locale.get('choose_help',)}`, {
//                 reply_markup: {
//                     keyboard: [
//                         ['/kk', '/ru', '/help'],
//                         ['/sendPoll']
//                     ],
//                     resize_keyboard: true,
//                     one_time_keyboard: true
//                 }
//             });
//         });
// };
// const sendPoll = (ctx) => {
//     const
//         question = "Как вам настроение сегодня?",
//         options = ['Отлично', 'Хорошо', 'Так себе'],
//         correctOptionIndex = 0; // Индекс правильного ответа в массиве options
//     ctx.replyWithQuiz(question, options, {correct_option_id: correctOptionIndex});
// }
//
// const kk = (ctx) => {
//     Locale.setLocale('kk')
//     ctx.reply('Выбран казахский язык')
// };
// const ru = (ctx) => {
//     Locale.setLocale('ru')
//     ctx.reply('Выбран русский язык')
// }

module.exports = {
    start,
    backMenu,
    startWhatWeather,
    startAdminOperations,
    showAllBirthdays,
    showNearBirthdays,
    ping,
}