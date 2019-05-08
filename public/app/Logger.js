const $ = require("../libs/jquery");

module.exports = function(text) {
	if (typeof text == "object") text = JSON.stringify(text, true);
	var update = $(".output").val();
		update += text;
		update += "\n";

	$(".output").val(update);
}