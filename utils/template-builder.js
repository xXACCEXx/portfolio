var fs = require('fs');


var interloper = /(\$\{([a-z$_][a-z0-9$_]+)\})/gi;


module.exports = function (templatePath, destPath, values) {
	return new Promise((resolve, reject) => {
		//	for file ops
		var read_s = fs.createReadStream(templatePath);
		var write_S = fs.createWriteStream(destPath);

		//	for regex
		var interlopes = Object.keys(values);

		read_s.on('data', function (chunk) {
			content = chunk.toString();

			//	replace ${<var>} with <var> value, for each one found
			interlopes.forEach(ref => {
				var customReg = new RegExp('(\\$\\{' + ref + '\\})', 'gi');
				content = content.replace(customReg, values[ref]);
			})

			write_S.write(content);
		});

		read_s.on('error', function (e) {
			throw e;
		});
	});
}