var templater = require('../utils/template-builder');

var svg2font = require('gulp-svgicons2svgfont');
var fs = require('fs');

//	icon templates
var iconClass = fs.readFileSync('./generator/icon-font/icon-class.txt', 'utf8');
var iconStyle = fs.readFileSync('./generator/icon-font/icon-style.txt', 'utf8');

module.exports = function () {
	var writeDest = fs.createWriteStream('./public/fonts/linear-icons.svg', { encoding: 'utf8' });

	return svg2font({
		fontName: 'linear-icons',
		startUnicode: 0xE800
	})
		.on('glyphs', function (glyphs) {
			//	glyphs = [{name, unicode, color}];

			var glyphChunks = [];

			glyphs
				.map(glyph => {
					var orig = glyph.unicode;
					glyph.unicode = "\\" + ('' + glyph.unicode).codePointAt(0).toString(16);
					// console.log(orig, '->', glyph.unicode);
					return glyph
				})
				.forEach(glyph => {
					var t = templater(iconClass, glyph)
					glyphChunks.push(t);
				})

			var finalSCSS = templater(iconStyle, { allIcons: glyphChunks.join('\n') });
			fs.createWriteStream('./tmp/icon-styling.scss').write(finalSCSS);
		})
}