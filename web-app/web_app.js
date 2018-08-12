const http = require('http');
const os = require('os');

const PORT = 80;
const HOST = '0.0.0.0';


console.log("Web server starting...");

var handler = function(request, response) {
console.log("Received request from " + request.connection.remoteAddress);
response.writeHead(200);
response.end("This app is running in pod " + os.hostname() + "\n");
};

var app = http.createServer(handler);
app.listen(PORT, HOST);
