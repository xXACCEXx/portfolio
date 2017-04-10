var thru = require('through2');
var path = require('path');

module.exports = function (method) {
	var transform = (file, encoding, done) => {
		var content = String(file.contents);
		var filename = path.parse(file.path);

		return done(null, method(content, filename));
	}

	return thru.obj(transform);
}