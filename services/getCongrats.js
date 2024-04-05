const {OpenAI} = require("openai");
require('dotenv').config({path: './config/.env'});
const {GPT_API_KEY} = process.env

const openai = new OpenAI({
    apiKey: GPT_API_KEY,
    dangerouslyAllowBrowser: true,
});

const getCongrats = async (name) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "You are a my best friend. Get Answer on Russian"},
            {
                role: 'user',
                content: `неформально поздравь с Днем Рождения алкоголика, ай-ти специалиста с именем ${name}, стиль поздравления - как будто ты пишешь в групповом чате в телеграм`
            },
        ],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
}

getOneAlcoFact = async () => {
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: "You our best friend. Get Answer on Russian. We are living in Kazakhstan"},
            {
                role: 'user',
                content: `скажи забавный факт про алкоголь всем участникам группы в телеграмм. он не должен напоминать о грусти или смерти. стиль текста - неформальный, с эмодзи,
                как сообщение в переписке в групповом чате с твоими друзьми. начинай без вступлений и упоминаний, что это забаваный факт, сразу говори факт`
            },
        ],
        model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
}

module.exports = {
    getCongrats,
    getOneAlcoFact
}
