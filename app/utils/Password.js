const bcrypt = require('bcrypt');

class Password {
    static hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hashSync(password, saltRounds);
    }

    static comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }

    static generateRandomPassword(length = 12) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        return password;
    }

    static isStrongPassword(password) {
        // Implement your own password strength validation logic here
        // This function can check for criteria such as length, uppercase, lowercase, digits, special characters, etc.
        return true; // Placeholder, replace with actual validation
    }

    static generatePasswordHashAndSalt(password, saltRounds = 10) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return { salt, hash };
    }

    static validatePasswordWithSalt(password, hash, salt) {
        const newHash = bcrypt.hashSync(password, salt);
        return newHash === hash;
    }

    static generatePasswordResetToken(userId, expirationHours = 1) {
        const tokenData = {
            userId,
            expiration: new Date(Date.now() + expirationHours * 3600000).toISOString()
        };
        // Use your preferred JWT library to generate a reset token
        const resetToken = generateJwtToken(tokenData);
        return resetToken;
    }

    static isPasswordResetTokenValid(token, userId) {
        // Use your preferred JWT library to verify the reset token
        const tokenData = verifyJwtToken(token);
        return tokenData && tokenData.userId === userId && new Date(tokenData.expiration) > new Date();
    }

}

module.exports = Password;
