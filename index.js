var config=require('./config');
var http = require('http');
var routing=require('./routing');


var server = http.createServer(routing);
server.listen(config.port || '3000', function(){
    console.log("Server listening on: http://localhost:%s", config.port || '3000');
});
module.exports = server;
