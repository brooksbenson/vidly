const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/config')();
require('./startup/db')();
require('./startup/middleware')(app);
require('./startup/routes')(app);

throw new Error('kdkdkd');

const PORT = process.env.PORT || 3000;
app.listen(PORT);
