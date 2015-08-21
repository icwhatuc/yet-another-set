var HelloWorld = require('./routes/helloWorld.js');
var hw = new HelloWorld();

module.exports = {
    '/hello' : hw,
};

