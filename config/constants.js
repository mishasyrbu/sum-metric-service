const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const METRIC_LIFETIME = process.env.METRIC_LIFETIME || 3600; // 1 hour

module.exports = {
    PORT,
    HOST,
    METRIC_LIFETIME,
};
