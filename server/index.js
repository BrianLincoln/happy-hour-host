// server/index.js

'use strict';

const app = require('./app');
const https = require('https');
const fs = require('fs');
var secretConfig = require('../secret-config');

const options = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem'),
  passphrase: secretConfig.certPassphrase,
  requestCert: false,
  rejectUnauthorized: false
};

const PORT = 80;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

https.createServer(options, app).listen(443);