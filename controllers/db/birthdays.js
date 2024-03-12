const Birthdays = require("../../models/birthdays");
const {mainMenu} = require("../../utils/buttons");
const {getHumanDate} = require("../../utils/filters");

module.exports.createBirthday = (req, ctx) => {
    // как вернуть ошибку боту?
    Birthdays.create({...req})
        .then(() => ctx.reply(`Окей, я запомнил ДР у ${req.person} - ${getHumanDate(req.birthday_date)}. Пиши еще...`))
        .catch((err) => ctx.reply(`Ошибка, спроси айтишника что это значит: ${err}`, {
            ...mainMenu
        }))

}

module.exports.getAllBirthdays = () => {
    return Birthdays.find()
}

module.exports.getNearBirthdays = () => {
    // показать ближайшее ДР в текущем месяце
    const today = new Date();
    const todayMonth = today.getUTCMonth() + 1; // потмоу что месяц берётся по индексу :)
    const todayDate = today.getUTCDate();
    console.log('getNearBirthday', todayMonth, todayDate)
    // сортяга по  $eq текущему месяцу и $gte текущего дня
    return Birthdays
        .aggregate([
            {
                $project: {
                    month: {$month: "$birthday_date"}, //  извлекает месяц из поля birthday_date
                    day: {$dayOfMonth: "$birthday_date"}, // извлекает день из поля birthday_date
                    person: 1, // оператор 1 - передаёт все значения свойства исходного документа
                    birthday_date: 1,
                }
            },
            {
                $match: //  соответствует ли каждый документ заданным критериям?
                    {
                        $expr: {
                            $and: [
                                {$eq: ["$month", todayMonth]},
                                {$gte: ["$day", todayDate]}
                            ]
                        }
                    }
            },
            {
                $sort: {
                    day: 1
                }
            }
        ])
}

module.exports.getTodayBirthdays = () => {
    const today = new Date();
    const todayMonth = today.getUTCMonth() + 1; // потмоу что месяц берётся по индексу :)
    const todayDate = today.getUTCDate();
    return Birthdays
        .aggregate([
            {
                $project: {
                    month: {$month: "$birthday_date"}, //  извлекает месяц из поля birthday_date
                    day: {$dayOfMonth: "$birthday_date"}, // извлекает день из поля birthday_date
                    person: 1, // оператор 1 - передаёт все значения свойства исходного документа
                    birthday_date: 1,
                }
            },
            {
                $match: //  соответствует ли каждый документ заданным критериям?
                    {
                        $expr: {
                            $and: [
                                {$eq: ["$month", todayMonth]},
                                {$eq: ["$day", todayDate]}
                            ]
                        }
                    }
            },
        ])
}

module.exports.deleteBirthday = (person) => {
    return Birthdays.findOneAndDelete({person})

}