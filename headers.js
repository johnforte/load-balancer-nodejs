var config = require('./config');
module.exports = function(request) {
    var headers = {};
    for (index = 0; index < config.headers.length; ++index) {
        if (config.headers[index].enabled) {
            if (config.headers[index].name == "x-forwarded-for") {
                headers['x-forwarded-for'] = request.connection.remoteAddress;
            } else if (config.headers[index].name == "x-forwarded-proto") {
                headers['x-forwarded-proto'] = (!request.connection.encrypted ? "http" : "https");
            } else if (config.headers[index].name == "x-forwarded-port") {
                headers['x-forwarded-port'] = request.socket.localPort;
            }
        }
    }
    headers['host'] = config.domain;
    var ignoredheaders = [
        "host",
        "x-forwarded-for",
        "x-forwarded-proto",
        "x-forwarded-port"
    ];
    Object.keys(request.headers).forEach(function(key) {
        if (ignoredheaders.indexOf(key)==-1) {
            headers[key] = request.headers[key];
        }
    });
    return headers;
};
