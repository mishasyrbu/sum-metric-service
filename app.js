const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { PORT } = require('./config/constants');
const { removeOutdatedMetricsCron } = require('./db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan(':date[iso] - notice: :remote-addr ":method :url" :req[X-Request-Id]', { immediate: true }));
app.use(morgan(':date[iso] - notice: :remote-addr ":method :url" :status :res[content-length] :res[X-Request-Id]'));

require('./routes')(app);

app.listen(PORT, () => {
    removeOutdatedMetricsCron(); // clean metrics cron task
    console.log(`Server running on port ${PORT}`);
});
