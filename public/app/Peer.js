const Peer = require("simple-peer");
const out = require("./Logger");
const $ = require("../libs/jquery");

module.exports = Controller = {
	peer: null,
	other_peer: null,

	init(initiator = false, stream, cb) {
		var peer = new Peer({
			initiator,
			trickle: false,
			stream
		});
		
		peer.on("signal", data => {
			out(data);
			cb(data);
		});

		peer.on('stream', (stream) => {
			console.log(stream);
			var video = $("video")[0];
			$(video).removeClass("hidden");
			video.srcObject = stream;
			video.play();
		});

		Controller.peer = peer;
	},

	receive() {
		Controller.peer.signal(Controller.other_peer);
		$("video").removeClass("hide");
	}
}