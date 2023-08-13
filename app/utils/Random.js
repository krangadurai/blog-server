class RandomUtils {
    static generateRandomBytes(length) {
        const randomBytes = require('crypto').randomBytes(length);
        return randomBytes.toString('hex');
    }

    static generateRandomPassword(length = 12) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * randomChars.length);
            password += randomChars.charAt(randomIndex);
        }
        return password;
    }

    static generateRandomToken(length = 32) {
        const randomBytes = RandomUtils.generateRandomBytes(length / 2);
        return randomBytes;
    }

    static generateRandomOTP(digits = 6) {
        const otp = Math.floor(Math.random() * (10 ** digits));
        return otp.toString().padStart(digits, '0');
    }
    static generateRandomString(length = 8) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * randomChars.length);
            result += randomChars.charAt(randomIndex);
        }
        return result;
    }

    static generateRandomBoolean() {
        return Math.random() < 0.5;
    }
    static generateRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static generateRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    static generateRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    static generateRandomColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        return randomColor;
    }
}

module.exports = RandomUtils;
