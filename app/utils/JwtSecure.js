class JwtSecureLinkUtils {
    static signJwt(data, secret, options = {}) {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, secret, options);
    }

    static verifyJwt(token, secret) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }

    static generateSecureLink(data, secret, expiresIn = '1h') {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, secret, { expiresIn });
    }

    static verifySecureLink(token, secret) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
    
    static generateAccessToken(data, secret, expiresIn = '15m') {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, secret, { expiresIn });
    }

    static verifyAccessToken(token, secret) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }

    static generateRefreshToken(data, secret, expiresIn = '7d') {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, secret, { expiresIn });
    }

    static verifyRefreshToken(token, secret) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
    
    static generateCustomToken(data, secret, expiresIn = '24h') {
        const jwt = require('jsonwebtoken');
        return jwt.sign(data, secret, { expiresIn });
    }

    static verifyCustomToken(token, secret) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }
    
    static decodeJwt(token) {
        const jwt = require('jsonwebtoken');
        try {
            return jwt.decode(token);
        } catch (error) {
            return null;
        }
    }
    
    static getTokenExpirationDate(token) {
        const decoded = this.decodeJwt(token);
        if (decoded && decoded.exp) {
            return new Date(decoded.exp * 1000);
        }
        return null;
    }
    
}

module.exports = JwtSecureLinkUtils;
