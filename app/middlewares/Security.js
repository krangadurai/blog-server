const csrf = require('csurf');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Apply security middleware to Express app
function applySecurityMiddleware(app) {
  // Add security headers
  app.use(helmet());

  // Enable Cross-Site Request Forgery (CSRF) protection
  const csrfProtection = csrf();
  app.use(csrfProtection);

  // Implement rate limiting to prevent brute force attacks
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Custom middleware to log security-related information
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.originalUrl}`);
    next();
  });
}

module.exports = {
  applySecurityMiddleware,
};
