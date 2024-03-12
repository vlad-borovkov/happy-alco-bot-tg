const CMD_BUTTONS = {
    add_birthday: "Добавить ДР",
    save_birthday: "Сохранить ДР",
    delete_birthday: "Удалить ДР",
    get_soon_birthday: "Узнать ДР в этом месяце",
    get_all_birthdays: "Показать все ДР",
    schedule_birthday: "Логгирование ДР",
    start_schedule: "Начни присылать ДР",
    stop_schedule: "Прекрати присылать ДР",
    help: "Помощь",
    menu: "Меню",
    whatWeather: "Какая погода?",
    sendLocation: "Поделиться геопозицией",
    send: "Отправить",
    adminPanel: "Панель админа",
    exitFromSaveBirthday: "Выйти из добавления ДР",
    notAdmin: "Вы не админ, вам нечего тут делать"
}

const API_WEATHER = 'https://api.open-meteo.com/v1/forecast'

module.exports = {
    CMD_BUTTONS,
    API_WEATHER
}