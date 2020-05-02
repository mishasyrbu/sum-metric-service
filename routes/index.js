const { saveMetric, getMetricsSumByKey, getMetricsByKey } = require('../db');

module.exports = app => {
    /**
     * Get metric bu key
     */
    app.get('/metric/:key', async (req, res, next) => {
        try {
            const { key } = req.params;
            const metrics = await getMetricsByKey(key);

            return res.status(200).json(metrics);
        } catch (error) {
            return next(error);
        }
    });

    /**
     * Get sum of metrics by key
     */
    app.get('/metric/:key/sum', async (req, res, next) => {
        try {
            const { key } = req.params;
            const value = await getMetricsSumByKey(key);

            return res.status(200).json({ value });
        } catch (error) {
            return next(error);
        }
    });

    /**
     * Save metric data
     */
    app.post('/metric/:key', async (req, res, next) => {
        try {
            const { key } = req.params;
            const value = parseFloat(req.body.value);

            await saveMetric(key, value);

            return res.status(200).json({});
        } catch (error) {
            return next(error);
        }
    });
};
