var config = require('./config');
var Cookies = require( "cookies" );
var servers = config.proxy_servers;
var last_server = null;
var cookies;
module.exports = function(request, response) {
    cookies = new Cookies(request, response);
    if(config.sticky_sessions.enabled && cookies.get("server") && cookies.get("server")<=servers.length-1){
          return servers[cookies.get("server")].ip;
    }
    if (config.routing_method == "round-robin") {
        return getRoundRobin();
    }
};

function getRoundRobin() {
    if (last_server == null) {
        last_server=0;
    }else{
        if(last_server+1>servers.length-1){
            last_server=0;
        }else{
            last_server=last_server+1;
        }
    }
    if(config.sticky_sessions.enabled){
        writeToCookie(last_server);
    }
    return servers[last_server].ip;
}
function writeToCookie(serverid){
  cookies.set("server",serverid, {
      maxAge:config.sticky_sessions.time*1000,
      domain:config.domain,
      overwrite:true
  });
}
