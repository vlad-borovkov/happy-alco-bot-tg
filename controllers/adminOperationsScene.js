const {Scenes} = require("telegraf");
const {adminOperations} = require("../utils/buttons");
const {CMD_BUTTONS} = require("../config/constans");

const {
    backMenu,
    showAllBirthdays,
    showNearBirthdays,
    startScheduleBirthday, startDeleteBirthdayScene, startAddBirthdayScene
} = require("./commands");

// будет одна базовая сцена, от которой ветвятся WizardScenes
const adminScene = new Scenes.BaseScene('adminOperations')
adminScene.enter((ctx) => {

    console.log('startAdminOperations')
    ctx.reply('Ты в админке. Выбери действие', {
        ...adminOperations
    })

})

// WizardScenes
adminScene.hears(CMD_BUTTONS.delete_birthday, startDeleteBirthdayScene);
adminScene.hears(CMD_BUTTONS.add_birthday, startAddBirthdayScene);
adminScene.hears(CMD_BUTTONS.schedule_birthday, startScheduleBirthday);

// Другие команды
adminScene.hears(CMD_BUTTONS.get_all_birthdays, showAllBirthdays);
adminScene.hears(CMD_BUTTONS.get_soon_birthday, showNearBirthdays);

adminScene.hears(CMD_BUTTONS.menu, (ctx) => {
    return ctx.scene.leave().then(() => backMenu(ctx))
})

module.exports = {
    adminScene
}