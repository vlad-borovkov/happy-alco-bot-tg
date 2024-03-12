const {Scenes} = require("telegraf");
const {birthdaySave} = require("../utils/buttons");
const {createBirthday} = require("./db/birthdays");
const {backMenu, showAllBirthdays} = require("./commands");
const {getBirthdayObject} = require("../utils/filters");
const {CMD_BUTTONS} = require("../config/constans");

const addBirthdayScene = new Scenes.WizardScene('addBirthdayScene',
    (ctx) => {
        ctx.reply('Чтобы я запомнил кого поздравить, отправь сообщением имя и фамилию, ' +
            'в формате - Вася Пупкин, дд.мм.гггг', {...birthdaySave})

        return ctx.wizard.next();
    },
    async (ctx) => {
        try {
            let birthdayObj = getBirthdayObject(ctx.message.text);
            await createBirthday(birthdayObj, ctx);
        } catch (e) {
            console.log(`ошибка из сцены ${ctx.session.__scenes.current}`, e);
            await ctx.reply(`${e.message}`)
            ctx.scene.leave().then(() => backMenu(ctx))
        }
    }
);

addBirthdayScene.hears(CMD_BUTTONS.get_all_birthdays, showAllBirthdays);
addBirthdayScene.hears(CMD_BUTTONS.menu, (ctx) => {
    return ctx.scene.leave().then(() => backMenu(ctx))
});

module.exports = {
    addBirthdayScene
}