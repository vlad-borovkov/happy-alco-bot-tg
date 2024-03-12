const {Markup} = require("telegraf");
const {CMD_BUTTONS} = require("../config/constans");

const mainMenu =
    Markup.keyboard([
        [CMD_BUTTONS.adminPanel]
    ]).resize();

const notAdmin = Markup.keyboard([
    [CMD_BUTTONS.notAdmin],
]).resize();

const adminOperations = Markup.keyboard([
    [CMD_BUTTONS.menu],
    [CMD_BUTTONS.schedule_birthday],
    [CMD_BUTTONS.get_soon_birthday],
    [CMD_BUTTONS.get_all_birthdays],
    [CMD_BUTTONS.add_birthday],
    [CMD_BUTTONS.delete_birthday]
]).resize();
const backButtonMenu = Markup.keyboard([
    [CMD_BUTTONS.menu]
]).resize();
const backButtonLocation = Markup.keyboard([
    Markup.button.locationRequest(CMD_BUTTONS.sendLocation),
    Markup.button.text(CMD_BUTTONS.menu)
]).resize()

const birthdaySave = Markup.keyboard([
    [CMD_BUTTONS.get_all_birthdays],
    [CMD_BUTTONS.menu]
]).resize()

const birthdayDelete = Markup.keyboard([
    [CMD_BUTTONS.get_all_birthdays],
    [CMD_BUTTONS.menu]
]).resize()

const scheduleBirthdayMenu = Markup.keyboard([
    [CMD_BUTTONS.start_schedule],
    [CMD_BUTTONS.stop_schedule],
    [CMD_BUTTONS.menu]
]).resize()

module.exports = {
    mainMenu,
    backButtonMenu,
    backButtonLocation,
    birthdaySave,
    adminOperations,
    scheduleBirthdayMenu,
    notAdmin,
    birthdayDelete
}