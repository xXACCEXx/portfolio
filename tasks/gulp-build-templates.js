var simple = require('../utils/stream-simplifier');
var Ractive = require('ractive');

module.exports = function () {
	return simple(function (content, filename) {
		var r_tmp = Ractive.parse(content);
		var tmpData = JSON.stringify(r_tmp);

		return `module.exports['${filename.name}'] = ${tmpData};\n`;
	});
}