var fs = require('fs');


var interloper = /(\$\{([a-z$_][a-z0-9$_]+)\})/gi;


module.exports = function (templatePath, destPath, values) {
	return new Promise((resolve, reject) => {
		var read_s = fs.createReadStream(templatePath);
		var write_S = fs.createWriteStream(destPath);

		var instances = [];

		read_s.on('data', function (chunk) {
			//	find ${<var>} and track
			

			//	check values has <var>
			//	replace ${<var>} with <var> value

			write_S.write()
		});

		read_s.on('error', function (e){
			throw e;
		});
	});
}