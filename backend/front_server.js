var httpModule = require('http');
const config = require('./plugins/config');
const router = require('./Router/router')

httpModule.createServer(router.handle).listen(81)
console.log(`Serverul ruleaza la ${config.URL}:${81}`);