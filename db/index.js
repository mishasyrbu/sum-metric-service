const { METRIC_LIFETIME } = require('../config/constants');
const logger = require('../logger');

/**
 * Functions are async to simulate DB async response
 */

const metrics = {}; // { key: [{ value, timestamp }] }
let cleanTaskId = null;

const getNow = () => ((new Date).getTime()/1000).toFixed();

/**
 * Save new metric value
 *
 * @param key
 * @param value
 * @returns {Promise<void>}
 */
const saveMetric = async (key, value) => {
    const now = getNow();

    if (!metrics[key]) {
        metrics[key] = [];
    }
    metrics[key].push({ value: Math.round(value), timestamp: now });
};

const getMetricsByKey = (key) => {
    if (metrics[key]) {
        return metrics[key];
    }

    throw new Error('Invalid key!');
};

/**
 * Get sum of all metrics
 *
 * @param key
 * @returns {number}
 */
const getMetricsSumByKey = (key) => {
    const metricsByKey = getMetricsByKey(key);

    return metricsByKey.reduce((sum, { value }) => {
        sum += value;

        return sum;
    }, 0);
};

/**
 * Remove outdated metrics
 */
const removeOutdatedMetricsCron = async () => {
    if (cleanTaskId) {
        clearTimeout(cleanTaskId);
    }

    const now = getNow();
    logger.success('Clean metrics task run');

    for (const key in metrics) {
        metrics[key] = metrics[key].filter(({ timestamp }) => now - timestamp < METRIC_LIFETIME);
    }

    cleanTaskId = setTimeout(removeOutdatedMetricsCron, METRIC_LIFETIME * 1000);
};

module.exports = {
    saveMetric,
    getMetricsByKey,
    getMetricsSumByKey,
    removeOutdatedMetricsCron,
};
