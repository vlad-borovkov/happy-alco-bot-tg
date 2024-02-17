// Регулярная проверка и уведомление об именинниках

const schedule = require("node-schedule");
schedule.scheduleJob('0 0 * * *', () => {
    const birthdayPeople = getBirthdayPeople();
    if (birthdayPeople.length > 0) {
        const chatId = GROUP_CHAT_ID; // Замените на ID вашей группы
        const message = `🎉 Сегодня поздравляем с днем рождения: ${birthdayPeople.join(', ')}`;
        bot.telegram.sendMessage(chatId, message);
    }
});