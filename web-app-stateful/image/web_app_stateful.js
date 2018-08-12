const http = require('http');
const os = require('os');
const fs = require('fs');

const PORT = 80;
const HOST = '0.0.0.0';
const data_file = "/var/data/data.txt";

console.log("Web server starting...");

function fileExists(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (e) {
    return false;
  }
}

var handler = function(request, response) {
	if (request.method == 'POST') {
		var file = fs.createWriteStream(data_file);
		file.on('open', function (fd) {
			request.pipe(file);
			console.log("New data has been received and stored.");
			response.writeHead(200);
			response.end("Data stored on pod " + os.hostname() + "\n");
		});
	} else {
		var data = fileExists(data_file)
			? fs.readFileSync(data_file, 'utf8')
			: "No data posted yet";
		response.writeHead(200);
		response.write("You've hit " + os.hostname() + "\n");
		response.end("Data stored on this pod: " + data + "\n");
	}
};

var app = http.createServer(handler);
app.listen(PORT, HOST);
