const io = require("../libs/socket.io");
const Peer = require("./Peer");
const out = require("./Logger");
const $ = require("../libs/jquery");

module.exports = {
	init() {
		var socket = io();

		socket.on("hello", data => {
			out("Socket.io: " + data);
		});

		socket.on("user", data => {
			out("Socket.io: User connected");
		});

		socket.on("calling", token => {
			Peer.other_peer = token;
			$(".receive").removeClass("hide");
			$(".call").addClass("hide");
			out("Socket.io: User calling...");
		});

		socket.on("receive_success", token => {
			Peer.other_peer = token;
			Peer.receive();
		});

		return socket;
	}
}