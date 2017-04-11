var simple = require('../utils/stream-simplifier');
var svg2font = require('gulp-svgicons2svgfont');

module.exports = function () {
	return simple(function (content, filename) {
		svg2font({
			fontName: 'linear-icons',
			startUnicode: 0xE800
		}).on('glyphs', function (glyphs) {
			console.log('t', glyphs);
		})
	})
}