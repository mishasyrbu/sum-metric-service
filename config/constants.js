const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const METRIC_LIFETIME = process.env.METRIC_LIFETIME || 3600 * 2; // 2 hours in seconds

module.exports = {
    PORT,
    HOST,
    METRIC_LIFETIME,
};
