const Peer = require("simple-peer");

var peer = null;
var stream = null;

$(".call").click(function(){
	initPeer();
});



function initPeer() {
	peer = new Peer({
		initiator: true,
		trickle: false
	});

	peer.on("signal", data => {
		out(data);
	});
}


function out(text) {
	if (typeof text == "object") text = JSON.stringify(text, true);
	var update = $(".output").val();
		update += text;
		update += "\n\n";

	$(".output").val(update);
}





navigator.getUserMedia({ video: true, audio: true }, s => {stream = s}, e => {out(e)});