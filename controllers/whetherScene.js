const {Scenes} = require("telegraf");
const {backButtonLocation} = require("../utils/buttons");
const {getWeatherByCord} = require ("../services/getWeatherByCord");
const {CMD_BUTTONS} = require("../config/constans");
const {backMenu} = require("./commands");

const weatherScene = new Scenes.BaseScene('weather');
// действия при инициализации сцены
weatherScene.enter((ctx) => {
    ctx.reply('Пришли мне свою геопозицию', {...backButtonLocation})
})

// прослушибвание события
weatherScene.on('location', async ctx => {
    try {
        const msg = ctx.message;
        const {
            longitude,
            latitude
        } = msg.location;
        // запрос к API
        const data = await getWeatherByCord({longitude, latitude})
        ctx.reply(`Сейчас у тебя ${data.current_weather.temperature} ${data.current_weather_units.temperature}
        \nВетер - ${data.current_weather.windspeed} ${data.current_weather_units.windspeed}`)
    } catch (e) {
        console.log('Some error', e)
        ctx.reply('Произошла какая-то ошибка')
    }
})

// слушаем нажатие кнопки меню, чтобы прекратить сцену, и вызываем команду
weatherScene.hears(CMD_BUTTONS.menu, (ctx) => {
    ctx.scene.leave().then(() =>{});
    return backMenu(ctx)
})

module.exports = {
    weatherScene
}