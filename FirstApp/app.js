const log = require('./logger');
//console.log(logger);
log('message');

const fs = require('fs');

const files =fs.readdirSync('./');

console.log(files);