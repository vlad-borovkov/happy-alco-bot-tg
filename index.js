require('dotenv').config();
const { Telegraf } = require('telegraf');
const Locale  = require('./locale/index');
const schedule = require('node-schedule');
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// TODO: -API для запоминания дат, БД для сохранения дат, настроить шедулер

// Регулярная проверка и уведомление об именинниках
schedule.scheduleJob('0 0 * * *', () => {
    const birthdayPeople = getBirthdayPeople();
    if (birthdayPeople.length > 0) {
        const chatId = GROUP_CHAT_ID; // Замените на ID вашей группы
        const message = `🎉 Сегодня поздравляем с днем рождения: ${birthdayPeople.join(', ')}`;
        bot.telegram.sendMessage(chatId, message);
    }
});

// Обработчик команды /start
bot.start((ctx) => {
    console.log('стартуем!', Locale.get('hello'))
    ctx.reply(Locale.get('hello'))
});
bot.help((ctx) => {
// вызывает клавиутуру телеграмма с кнопками-командами
    console.log('текущая локаль ---->', Locale.getCurrentLocale())
    console.log('контекст сообщения ---->', ctx);
    // нужна мидлвэрина, которая запоминает пользователя по id и возвращает его конфиг для локализации
        ctx.replyWithChatAction('typing')
            .then(() => {
                ctx.reply(Locale.get('choose_help'), {
                    reply_markup: {
                        keyboard: [
                            ['/kk', '/ru', '/help'],
                            ['/sendPoll']
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            });
})

bot.command('kk', (ctx) => {
    Locale.setLocale('kk')
    ctx.reply('Выбран казахский язык')
})
bot.command('ru', (ctx) => {
    Locale.setLocale('ru')
    ctx.reply('Выбран русский язык')
})
bot.command('sendPoll', (ctx) => {
    const
        question = "Как вам настроение сегодня?",
        options = ['Отлично', 'Хорошо', 'Так себе'],
        correctOptionIndex = 0; // Индекс правильного ответа в массиве options
    ctx.replyWithQuiz(question, options, { correct_option_id: correctOptionIndex });
})

// Обработчик для проверки дней рождения участников
bot.hears(['ДР', 'день рождения'], (ctx) => {
    console.log('проверка дат с ДР')
    const birthdayPeople = getBirthdayPeople();

    if (birthdayPeople.length === 0) {
        ctx.reply('Сегодня нет празднующих день рождения.');
    } else {
        ctx.reply('Сегодня поздравляем с днем рождения:');
        birthdayPeople.forEach((person) => {
            ctx.reply(`🎉 ${person}`);
        });
        const chatId = GROUP_CHAT_ID;
        const message = `🎉 Сегодня поздравляем с днем рождения: ${birthdayPeople.join(', ')}`;
        bot.telegram.sendMessage(chatId, message);
    }
});



// Запустить бот
bot.launch();

function getBirthdayPeople() {
    return ['Имя1', 'Имя2'];
}
