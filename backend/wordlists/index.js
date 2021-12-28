let CHINESE_SIMPLIFIED_WORDLIST = require('./chinese_simplified.json')
let CHINESE_TRADITIONAL_WORDLIST = require('./chinese_traditional.json')
let ENGLISH_WORDLIST = require('./english.json')
let FRENCH_WORDLIST = require('./french.json')
let ITALIAN_WORDLIST = require('./italian.json')
let JAPANESE_WORDLIST = require('./japanese.json')
let KOREAN_WORDLIST = require('./korean.json')
let SPANISH_WORDLIST = require('./spanish.json')
let DEFAULT_WORDLIST = ENGLISH_WORDLIST

module.exports = {
    wordlists: {
        EN: ENGLISH_WORDLIST,
        JA: JAPANESE_WORDLIST,
        chinese_simplified: CHINESE_SIMPLIFIED_WORDLIST,
        chinese_traditional: CHINESE_TRADITIONAL_WORDLIST,
        english: ENGLISH_WORDLIST,
        french: FRENCH_WORDLIST,
        italian: ITALIAN_WORDLIST,
        japanese: JAPANESE_WORDLIST,
        korean: KOREAN_WORDLIST,
        spanish: SPANISH_WORDLIST,
        DW:DEFAULT_WORDLIST
    }
}