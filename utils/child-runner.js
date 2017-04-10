var child_process = require('child_process');

module.exports = function (cmd) {
	return new Promise((resolve, reject) => {
		var _cmd = cmd.split(' ');
		var cp = child_process.spawn(_cmd[0], _cmd.slice(1));

		var logs = [];

		cp.stdout.on('data', function (data) {
			logs.push(data)
		});

		cp.stderr.on('data', function (err){
			reject(err);
		});

		cp.on('close', function () {
			resolve(logs);
		});
	})
}