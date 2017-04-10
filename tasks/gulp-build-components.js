var simple = require('../utils/stream-simplifier');

module.exports = function () {
	return simple(function (content, file) {
		return `module.exports['${file.name}'] = require('../front/components/${file.name}/${file.name}.js');\n`;
	})
}