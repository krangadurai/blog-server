const aes = require('aes-js');

class Encryption {
    constructor(aesKey) {
        this.key = aes.utils.utf8.toBytes(aesKey);
        if (this.key.length !== 32) {
            throw new Error('Invalid key size for AES. Must be 256-bit / 32 bytes.');
        }
    }

    encrypt(text) {
        const bytesInfo = aes.utils.utf8.toBytes(text);
        const aesCtr = new aes.ModeOfOperation.ctr(this.key);
        const encryptedBytes = aesCtr.encrypt(bytesInfo);
        return aes.utils.hex.fromBytes(encryptedBytes);
    }

    decrypt(encryptedHex) {
        const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
        const aesCtr = new aes.ModeOfOperation.ctr(this.key);
        const decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return aes.utils.utf8.fromBytes(decryptedBytes);
    }
    
    generateRandomKey(keySizeBytes = 32) {
        const randomBytes = aes.utils.hex.fromBytes(aes.utils.randomBytes(keySizeBytes));
        return randomBytes;
    }
    
    encryptWithIV(text, ivHex) {
        const bytesInfo = aes.utils.utf8.toBytes(text);
        const ivBytes = aes.utils.hex.toBytes(ivHex);
        const aesCbc = new aes.ModeOfOperation.cbc(this.key, ivBytes);
        const encryptedBytes = aesCbc.encrypt(bytesInfo);
        return aes.utils.hex.fromBytes(encryptedBytes);
    }

    decryptWithIV(encryptedHex, ivHex) {
        const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
        const ivBytes = aes.utils.hex.toBytes(ivHex);
        const aesCbc = new aes.ModeOfOperation.cbc(this.key, ivBytes);
        const decryptedBytes = aesCbc.decrypt(encryptedBytes);
        return aes.utils.utf8.fromBytes(decryptedBytes);
    }
    
}

module.exports = Encryption;
