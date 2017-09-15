// server/index.js

'use strict';

const app = require('./app');
const https = require('https');
var secretConfig = require('./secret-config');

const PORT = 80;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
https.createServer(secretConfig.certOptions, app).listen(443);