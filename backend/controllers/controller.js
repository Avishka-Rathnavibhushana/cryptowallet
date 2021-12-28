// controllers/controller.js
let Buffer = require('safe-buffer').Buffer
let Hash = require('hash.js')
const crypto = require('crypto');

const { wordlists } = require('../wordlists/index');

let INVALID_MNEMONIC = 'Invalid mnemonic'
let INVALID_ENTROPY = 'Invalid entropy'
let INVALID_CHECKSUM = 'Invalid mnemonic checksum'

const firstRequest = async (req, res, next) => {
    try {
        res.json({ message: "Hello from server!" });
    } catch (err) {
        next(err);
    }
};

const generateMnemonic = async (req, res, next) => {
    strength = req.body.strength
    wordlist = req.body.wordlist
    
    console.log("strength " + strength)
    console.log("wordlist " + wordlist)
    strength = strength || 128
    if (strength % 32 !== 0) throw new TypeError(INVALID_ENTROPY)

    mnemonicPhrase = ""

    return new Promise((resolve, reject) => {
        crypto.randomBytes(strength / 8, (err, buf) => {
            if (err) {
                next(err);
                return reject(err)
            }
            mnemonicPhrase = entropyToMnemonic(buf, wordlist)
            res.json({ message: mnemonicPhrase });
            return resolve(mnemonicPhrase)
        })
    })

    
    // return entropyToMnemonic(randomBytes(strength / 8), wordlist)
}

const entropyToMnemonic  = (entropy,wordlist) => {
    console.log("entropy " + entropy)
    if (!Buffer.isBuffer(entropy)) entropy = Buffer.from(entropy, 'hex')
    wordlist = convertStringToWordlist(wordlist) || wordlists.DW
    
    // 128 <= ENT <= 256
    if (entropy.length < 16) throw new TypeError(INVALID_ENTROPY)
    if (entropy.length > 32) throw new TypeError(INVALID_ENTROPY)
    if (entropy.length % 4 !== 0) throw new TypeError(INVALID_ENTROPY)

    let entropyBits = bytesToBinary([].slice.call(entropy))
    let checksumBits = deriveChecksumBits(entropy)
    console.log("entropyBits " + entropyBits)
    console.log("checksumBits " + checksumBits)

    let bits = entropyBits + checksumBits
    let chunks = bits.match(/(.{1,11})/g)
    let words = chunks.map(function (binary) {
        let index = binaryToByte(binary)
        return wordlist[index]
    })
    console.log("wordlist")
    console.log(words)
    return wordlist === wordlists.japanese ? words.join('\u3000') : words.join(' ')
}

const convertStringToWordlist = (wordlist)=>{
    wordlistsLocal = {
        "chinese_simplified": wordlists.chinese_simplified,
        "chinese_traditional": wordlists.chinese_traditional,
        "english": wordlists.english,
        "french": wordlists.french,
        "italian": wordlists.italian,
        "japanese": wordlists.japanese,
        "korean": wordlists.korean,
        "spanish": wordlists.spanish,
        "DW": wordlists.DW,
    }

    if (wordlistsLocal[wordlist]) {
        return wordlistsLocal[wordlist]
    } else {
        return wordlistsLocal["DW"]
    }
}

function bytesToBinary (bytes) {
    return bytes.map(function (x) {
        return lpad(x.toString(2), '0', 8)
    }).join('')
}

function binaryToByte (bin) {
    return parseInt(bin, 2) 
}

function deriveChecksumBits (entropyBuffer) {
    let ENT = entropyBuffer.length * 8
    let CS = ENT / 32
    let hash = crypto.createHash('sha256').update(entropyBuffer).digest()

    return bytesToBinary([].slice.call(hash)).slice(0, CS)
}

function lpad (str, padString, length) {
    while (str.length < length) str = padString + str
    return str
}



// function sha256 (data) {
//     data = Buffer.from(data)
//     return Hash.sha256().update(data).digest('hex')
// }

// function salt (password) {
//     return 'mnemonic' + (password || '')
// }

// async function mnemonicToSeed (mnemonic, password) {
//     let mnemonicBuffer = Buffer.from(unorm.nfkd(mnemonic), 'utf8')
//     let saltBuffer = Buffer.from(salt(unorm.nfkd(password)), 'utf8')

//     // return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')
//     return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')
// }

// async function mnemonicToSeedHex (mnemonic, password) {
//     return mnemonicToSeed(mnemonic, password).toString('hex')
// }

// function mnemonicToEntropy (mnemonic, wordlist) {
//     wordlist = wordlist || DEFAULT_WORDLIST

//     let words = unorm.nfkd(mnemonic).split(' ')
//     if (words.length % 3 !== 0) throw new Error(INVALID_MNEMONIC)

//     // convert word indices to 11 bit binary strings
//     let bits = words.map(function (word) {
//         let index = wordlist.indexOf(word)
//         if (index === -1) throw new Error(INVALID_MNEMONIC)

//         return lpad(index.toString(2), '0', 11)
//     }).join('')

//     // split the binary string into ENT/CS
//     let dividerIndex = Math.floor(bits.length / 33) * 32
//     let entropyBits = bits.slice(0, dividerIndex)
//     let checksumBits = bits.slice(dividerIndex)

//     // calculate the checksum and compare
//     let entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte)
//     if (entropyBytes.length < 16) throw new Error(INVALID_ENTROPY)
//     if (entropyBytes.length > 32) throw new Error(INVALID_ENTROPY)
//     if (entropyBytes.length % 4 !== 0) throw new Error(INVALID_ENTROPY)

//     let entropy = Buffer.from(entropyBytes)
//     let newChecksum = deriveChecksumBits(entropy)
//     if (newChecksum !== checksumBits) throw new Error(INVALID_CHECKSUM)

//     return entropy.toString('hex')
// }

// function validateMnemonic (mnemonic, wordlist) {
//     try {
//         mnemonicToEntropy(mnemonic, wordlist)
//     } catch (e) {
//         return false
//     }

//     return true
// }

module.exports = {
    generateMnemonic: generateMnemonic,
    entropyToMnemonic: entropyToMnemonic,
    // mnemonicToSeed: mnemonicToSeed,
    // mnemonicToSeedHex: mnemonicToSeedHex,
    // mnemonicToEntropy: mnemonicToEntropy,
    // validateMnemonic: validateMnemonic,
}