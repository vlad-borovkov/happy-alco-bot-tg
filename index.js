const mongoose = require("mongoose/index");
const {setupBot} = require("./bot");
require('dotenv').config({path: './config/.env'});
const {MONGO_ADR} = process.env;

(async function () {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_ADR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'alco-birthday'
        }); // даём знать мангусту где наша БД
        // запустить бот c настройками
        await setupBot()
            .launch()
            .then((ctx) => console.log('бот запущен'))

    } catch (e) {
        console.log('Ошибка запуска', e)
    }
}())