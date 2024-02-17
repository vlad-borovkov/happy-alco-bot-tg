const {Markup} = require("telegraf");
const {CMD_BUTTONS} = require("../config/constans");

const mainMenu =
    Markup.keyboard([
        [CMD_BUTTONS.whatWeather],
        [CMD_BUTTONS.get_soon_birthday],
        [CMD_BUTTONS.get_all_birthdays],
        [CMD_BUTTONS.add_birthday],
        [CMD_BUTTONS.help]
    ]).resize();

const backButtonMenu = Markup.keyboard([
            [CMD_BUTTONS.menu]
        ]).resize()

const backButtonLocation = Markup.keyboard([
        Markup.button.locationRequest(CMD_BUTTONS.sendLocation),
        Markup.button.text(CMD_BUTTONS.menu)
    ]).resize()

module.exports = {
    mainMenu,
    backButtonMenu,
    backButtonLocation
}