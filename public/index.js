const Socket = require("./app/Socket");
const Peer = require("./app/Peer");
const out = require("./app/Logger");
const $ = require("./libs/jquery");

var socket = null;
var peer = null;
var stream = null;


navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(s => {stream = s;}).catch(e => {out(e)});


$(".call").click(function(){
	Peer.init(true, stream, token => {
		socket.emit("call", JSON.stringify(token));
		$(".call").addClass("hide");
	});
});

$(".receive").click(function(){
	Peer.init(false, stream, token => {
		socket.emit("receive", JSON.stringify(token));
	});

	Peer.receive();
});


socket = Socket.init();
