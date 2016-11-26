var requestmodule=require('request');
var headers=require('./headers');
var servers=require('./servers');
module.exports =function(request, response){
  requestmodule({
      "method":request.method,
      "headers": headers(request),
      "baseUrl":(!request.connection.encrypted? "http":"https")+"://"+servers(request,response)+"/",
      "uri":request.url,
      "followAllRedirects":true
  }).pipe(response);
};
