const {Scenes} = require("telegraf");
const {sendBirthday, mainMenu, birthdaySave} = require("../utils/buttons");
const {CMD_BUTTONS} = require("../config/constans");
const {getBirthdayObject} = require("../utils/filters");
const {createBirthday} = require("./db/birthdays");
const {backMenu, startAdminOperations, showAllBirthdays, showNearBirthdays} = require("./commands");


const adminOperations = new Scenes.BaseScene('adminOperations')
const isCurrentScene = (ctx) => adminOperations.id === ctx.session.__scenes.current;

adminOperations
    .hears(CMD_BUTTONS.add_birthday, async (ctx, next) => {
        ctx.reply('Чтобы я запомнил кого поздравить, отправь сообщением имя и фамилию, ' +
            'в формате - Вася Пупкин, дд.мм.гггг', {...birthdaySave})
            .then(async () => {
                // не работает два слушателя одновременно
                adminOperations.hears(/.*/, async (ctx, next) => {
                    console.log(ctx.message.text)
                    if (isCurrentScene(ctx)) {

                        try {

                            let birthdayObj = getBirthdayObject(ctx.message.text);
                            await createBirthday(birthdayObj, ctx);
                            // await ctx.scene.leave();
                            // await backMenu(ctx);
                        } catch (e) {
                            console.log(`ошибка из сцены ${ctx.session.__scenes.current}`, e);
                            await ctx.reply(`${e.message}`);
                        }
                        // Вызов следующего middleware через next()
                        next();
                    }
                })
            })
    })
adminOperations.hears(CMD_BUTTONS.menu, (ctx) => {
    ctx.scene.leave();
    return backMenu(ctx)
})
adminOperations.hears(CMD_BUTTONS.get_all_birthdays, showAllBirthdays);
adminOperations.hears(CMD_BUTTONS.get_soon_birthday, showNearBirthdays);

module.exports = {
    adminOperations
}