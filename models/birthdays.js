const mongoose = require('mongoose');


const birthdaysSchema = new mongoose.Schema({
    person: {
        type: String,
        required: true
    },
    birthday_date: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('birthdays', birthdaysSchema);