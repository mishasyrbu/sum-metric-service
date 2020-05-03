const { ErrorHandler } = require('../helpers/error');
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
        } catch ({ message }) {
            return next(new ErrorHandler(400, message));
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
        } catch ({ message }) {
            return next(new ErrorHandler(400, message));
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
                throw new ErrorHandler(400, 'Incorrect value type! Please provide an integer!');
            }

            await saveMetric(key, value);

            return res.status(200).json({});
        } catch (error) {
            return next(error);
        }
    });
};
