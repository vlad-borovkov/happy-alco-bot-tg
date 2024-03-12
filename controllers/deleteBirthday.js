const {Scenes} = require("telegraf");
const {deleteBirthday} = require("./db/birthdays");
const {birthdayDelete} = require("../utils/buttons");
const {backMenu, showAllBirthdays} = require("./commands");
const {CMD_BUTTONS} = require("../config/constans");

// перенести в WizardScenes
const deleteBirthdayScene = new Scenes.WizardScene('deleteBirthdayScene',
    (ctx) => {
        ctx.reply('Для удаления ДР, введи имя в формате - Вася Пупкин', {...birthdayDelete});
        // если необходимо - сохранять служебные данные
        //ctx.wizard.state.contactData = {};
        return ctx.wizard.next();
    },
    async (ctx) => {
        try {
            await deleteBirthday(ctx.message.text)
                .then(deletedDoc => {
                    if (deletedDoc) {
                        ctx.reply(`${deletedDoc.person} успешно удалён`);
                    } else {
                        ctx.reply("Документ не найден по указанному критерию");
                    }
                })
        } catch (e) {
            console.log(`ошибка из сцены ${ctx.session.__scenes.current}`, e);
            await ctx.reply(`${e.message}`);
            ctx.scene.leave().then(() => backMenu(ctx))
        }
    }
)

deleteBirthdayScene.hears(CMD_BUTTONS.get_all_birthdays, showAllBirthdays);
deleteBirthdayScene.hears(CMD_BUTTONS.menu, (ctx) => {
    return ctx.scene.leave().then(() => backMenu(ctx))
})

module.exports = {
    deleteBirthdayScene
}