function getBirthdayObject(string, next) {
    const regex = /^[А-Яа-яЁёA-Za-z]+\s[А-Яа-яЁёA-Za-z]+,\s\d{2}\.\d{2}\.\d{4}$/; // only this format Name Secondname, dd.mm.yyyy

    if (string !== '' && regex.test(string)) {
        const parts = string.split(', ');
        const person = parts[0];
        const dateForParse = parts[1];
        const [day, month, year] = dateForParse.split('.').map(Number);
        const birthday_date = new Date(Date.UTC(year, month - 1, day));
        return {person, birthday_date};
    } else {
        throw Error('Неправильный формат даты или имени, попробуй еще раз')
    }
}

function allBirthdaysToString(birthArr) {
    return birthArr.map((item) => `${item.person} — ${getHumanDate(item.birthday_date)}`).join('\n');
}

function getHumanDate(date) {
    return date.toLocaleDateString('ru', {day: '2-digit', month: '2-digit', year: 'numeric'})
}

function getSortedBirthday(birthdayArr) {
    // сортяга по возрастанию месяца
    function compare(a, b) {
        let dateA = new Date(a.birthday_date).getUTCMonth();
        let dateB = new Date(b.birthday_date).getUTCMonth();

        return dateA - dateB;
    }

    return birthdayArr.sort(compare)
}

module.exports = {
    getBirthdayObject,
    allBirthdaysToString,
    getHumanDate,
    getSortedBirthday
}