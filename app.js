const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes')(app);

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
