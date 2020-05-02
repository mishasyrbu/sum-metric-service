/**
 * Made functions async to simulate DB async response
 */

const metrics = []; // [{ key, value, timestamp }]

const saveMetric = async (key, value) => {
    const now = ((new Date).getTime()/1000).toFixed();

    metrics.push({ key, value, timestamp: now });
};

const getMetricsByKey = (key) => metrics.filter((metric) => metric.key === key);

const getMetricsSumByKey = (key) => metrics.reduce((sum, metric) => {
    if (metric.key === key) {
        sum += metric.value;
    }

    return sum;
}, 0);

module.exports = {
    saveMetric,
    getMetricsByKey,
    getMetricsSumByKey,
};
