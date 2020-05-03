const {
    saveMetric,
    getMetricsSumByKey,
    getMetricsByKey,
    removeOutdatedMetricsCron,
} = require('../db');

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
            await removeOutdatedMetricsCron(); // clear outdated metrics
            const value = await getMetricsSumByKey(key);

            return res.status(200).json({ value });
        } catch (error) {
            return res.status(500).json({ error });
        }
    });

    /**
     * Save metric data
     */
    app.post('/metric/:key', async (req, res, next) => {
        try {
            const { key } = req.params;
            const value = parseFloat(req.body.value);

            if (!value) {
                throw new Error('Incorrect value type! Please provide an integer!');
            }

            await saveMetric(key, value);

            return res.status(200).json({});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
