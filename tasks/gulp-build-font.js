var simple = require('../utils/stream-simplifier');

var svg2font = require('gulp-svgicons2svgfont');
var fs = require('fs');

module.exports = function () {
	var writeDest = fs.createWriteStream('./public/fonts/linear-icons.svg', { encoding: 'utf8' });

	// return simple(function (content, filename) {
	// 	console.log('glyph', content);
	// 	return content;
	// })

	return svg2font({
		fontName: 'linear-icons',
		startUnicode: 0xE800
	}).on('glyphs', function (glyphs) {
		//	glyphs = [{name, unicode, color}];

		var glyphChunks = [];

		glyphs.forEach(glyph => {
			console.log('glyphs', glyph);

			//	interlope all glyphs with an icon template
		})
	})
}