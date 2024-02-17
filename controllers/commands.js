const Locale = require("../locale");
const start = (ctx) => {
    ctx.reply(`${Locale.get('hello')}, ${ctx.message.from.username}`);
    console.log('</ Бот успешно запущен>');
}

const help = (ctx) => {
// вызывает клавиутуру телеграмма с кнопками-командами
    console.log(`текущая локаль у пользователя: ${ctx.message.from.id} ${ctx.message.from.username} ----> ${Locale.getCurrentLocale()}`)
    ctx.sendChatAction('typing')
        .then(() => {
            ctx.reply(`${ctx.message.from.first_name}, ${Locale.get('choose_help', )}`, {
                reply_markup: {
                    keyboard: [
                        ['/kk', '/ru', '/help'],
                        ['/sendPoll']
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        });
};
const sendPoll = (ctx) => {
    const
        question = "Как вам настроение сегодня?",
        options = ['Отлично', 'Хорошо', 'Так себе'],
        correctOptionIndex = 0; // Индекс правильного ответа в массиве options
    ctx.replyWithQuiz(question, options, { correct_option_id: correctOptionIndex });
}

const kk = (ctx) =>  {
    Locale.setLocale('kk')
    ctx.reply('Выбран казахский язык')
};
const ru = (ctx) => {
    Locale.setLocale('ru')
    ctx.reply('Выбран русский язык')
}

module.exports = {
    start
}