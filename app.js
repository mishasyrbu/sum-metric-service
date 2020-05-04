const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('./logger');
const { handleError } = require('./helpers/error');
const { PORT, HOST, METRIC_LIFETIME } = require('./config/constants');
const { removeOutdatedMetricsCron } = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':date[iso] - notice: :remote-addr ":method :url" :req[X-Request-Id]', { immediate: true }));
app.use(morgan(':date[iso] - notice: :remote-addr ":method :url" :status :res[content-length] :res[X-Request-Id]'));

app.get('/', function(request, response) {
    response.send('Hello World!')
});

require('./routes')(app);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(PORT, HOST, () => {
    logger.appStarted(PORT, HOST, METRIC_LIFETIME);
    removeOutdatedMetricsCron(); // clean metrics cron task
});
