
const RuLocalization = require('./ru');
const KkLocalization = require('./kk');

class Locale {
      constructor() {
          this._ruDictionary = RuLocalization;
          this._kkDictionary = KkLocalization;
          this._currentLocale = 'ru';
      }
    setLocale (choisedLocale) {
        this._currentLocale = choisedLocale;
    }
    get (keyLocale, locale = 'ru') {
        if (locale === 'ru') {
            return this._ruDictionary[keyLocale]
        } else if (locale === 'kk') {
            return this._kkDictionary[keyLocale]
        } else {
            return this._ruDictionary[keyLocale]
        }
    }
    getCurrentLocale () {
        return this._currentLocale
    }

}
module.exports = new Locale;
