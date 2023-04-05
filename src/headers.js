const csp = "default-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src *; frame-src 'self'";

module.exports = function (req, res, next) {
    res.setHeader('Content-Security-Policy', csp);
    res.setHeader('Permissions-Policy', 'interest-cohort=()');
    next();
};
