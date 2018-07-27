// server/index.js


const app = require('./app');
const https = require('https');
const secretConfig = require('./secret-config.js');

const PORT = 80;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
https.createServer(secretConfig.certOptions, app).listen(443);
