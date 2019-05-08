const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./public"));

server.listen(8080, () => console.log("App listen on http://localhost:8080"));



// Sockets

io.on('connection', function (socket) {
	//console.log("Connected");

	socket.broadcast.emit("user");
	socket.emit("hello", "Hello by Socket.io");

	socket.on("call", token => {
		socket.token = token;
		socket.broadcast.emit("calling", token);
		console.log("User calling");
	});

	socket.on("receive", token => {
		console.log("User accept call");
		socket.broadcast.emit("receive_success", token);
	});
});