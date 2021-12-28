// controllers/bip39Controller.js
const bip39 = require('bip39');

const generateMnemonic = async (req, res, next) => {
    console.log(req.body)
    console.log("BIP39")
    strength = req.body.strength
    wordlist = req.body.wordlist
    
    console.log("strength " + strength)
    console.log("wordlist " + wordlist)

    wordlist = convertStringToWordlist(wordlist)
    const mnemonic = bip39.generateMnemonic(strength, undefined,wordlist)
    res.json({ message: mnemonic });
    return mnemonic
}

// need to change below values for each key
const convertStringToWordlist = (wordlist)=>{
    wordlistsLocal = {
        "chinese_simplified": bip39.wordlists.chinese_simplified,
        "chinese_traditional": bip39.wordlists.chinese_traditional,
        "czech": bip39.wordlists.czech,
        "english": bip39.wordlists.english,
        "french": bip39.wordlists.french,
        "italian": bip39.wordlists.italian,
        "japanese": bip39.wordlists.japanese,
        "korean": bip39.wordlists.korean,
        "portuguese": bip39.wordlists.portuguese,
        "spanish": bip39.wordlists.spanish,
    }

    if (wordlistsLocal[wordlist]) {
        return wordlistsLocal[wordlist]
    } else {
        return wordlistsLocal["DW"]
    }
}

module.exports = {
    generateMnemonic: generateMnemonic,
    // mnemonicToSeed: mnemonicToSeed,
    // mnemonicToSeedHex: mnemonicToSeedHex,
    // mnemonicToEntropy: mnemonicToEntropy,
    // validateMnemonic: validateMnemonic,
}