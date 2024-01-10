require('dotenv').config();
const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');
const {TELEGRAM_BOT_TOKEN, GROUP_CHAT_ID} = process.env;
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

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
    console.log('стартуем, а потом пиздуем')
    ctx.reply('Привет! Я бот для поздравлений с днем рождения. Узнай, кто сегодня празднует!')
});

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
        const chatId = GROUP_CHAT_ID; // Замените на ID вашей группы
        const message = `🎉 Сегодня поздравляем с днем рождения: ${birthdayPeople.join(', ')}`;
        bot.telegram.sendMessage(chatId, message);
    }
});

// Запустить бот
bot.launch();

// Здесь вы можете добавить логику для получения списка именинников на сегодня
function getBirthdayPeople() {
    // Замените этот массив на вашу логику получения именинников
    return ['Имя1', 'Имя2'];
}
