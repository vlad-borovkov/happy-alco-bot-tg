const {Scenes} = require("telegraf");
const {scheduleJob} = require("node-schedule");
const {backMenu} = require("./commands");
const {scheduleBirthdayMenu} = require("../utils/buttons");
const {CMD_BUTTONS} = require("../config/constans");
const {getTodayBirthdays} = require("./db/birthdays");
const {getCongrats, getOneAlcoFact} = require("../services/getCongrats");
require('dotenv').config({path: './config/.env'});
const {GROUP_CHAT_ID} = process.env;

let job;

const scheduleBirthdayScene = new Scenes.WizardScene('scheduleBirthdayScene',
    (ctx) => {
        console.log('startScheduling', job)
        ctx.reply('Выбери действие. Начать или остановить регулярную отправку ДР в чат.', {
            ...scheduleBirthdayMenu
        })
        // ctx.wizard.state.schedule = {};
        return ctx.wizard.next();
    });

scheduleBirthdayScene.hears(CMD_BUTTONS.start_schedule, (ctx) => {
    console.log('startScheduling', job)
    if (job?.pendingInvocations.length >= 1) {
        ctx.reply(`Логгирование уже включено. Детали: ${job.name}`)
    } else {
        job = scheduleJob('* * * * *', () => {
            console.log('startScheduleJob')
            getTodayBirthdays()
                .then((birthdays) => {
                    if (birthdays.length >= 1) {
                        try {
                            birthdays.forEach(async (item) => {
                                const congrats = await getCongrats(item.person)
                                await ctx.telegram.sendMessage(GROUP_CHAT_ID, `${congrats}`);
                            })
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        try {
                            getOneAlcoFact()
                                .then((fact) => ctx.telegram.sendMessage(GROUP_CHAT_ID,
                                    `Сегодня без ДР, но не грустите.
                                        \n${fact}`
                                ))
                        } catch (e) {
                            console.log(e)
                        }
                    }
                })

        });
        // добавляем в коллекцию сцены свой объект с состояниями, чтобы управлять
        ctx.reply(`Окей, логгирование для чата с id ${GROUP_CHAT_ID} включено`)
        console.log('getTodayBirthdays', job)
    }
});

scheduleBirthdayScene.hears(CMD_BUTTONS.stop_schedule, (ctx) => {
    console.log(CMD_BUTTONS.stop_schedule, job)
    if (job?.pendingInvocations.length >= 1) {
        console.log('stopScheduleJob')
        job.cancel();
        ctx.reply(`Логгирование ДР в чате с id ${GROUP_CHAT_ID} остановлено`)

        // обновить состояние сцены в колелкции
        //ctx.wizard.state.schedule.isScheduleOn = false;
    } else {
        ctx.reply('Логгирование не было запущено')
    }
})

scheduleBirthdayScene.hears(CMD_BUTTONS.menu, (ctx) => {
    return ctx.scene.leave().then(() => backMenu(ctx))
});

module.exports = {
    scheduleBirthdayScene
}