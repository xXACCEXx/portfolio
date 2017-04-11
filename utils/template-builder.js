var fs = require('fs');
var interloper = /(\$\{([a-z$_][a-z0-9$_]+)\})/gi;

module.exports = function (template, values) {
	//	for regex
	var interlopes = Object.keys(values);
	var content = template;

	//	replace ${<var>} with <var> value, for each one found
	interlopes.forEach(ref => {
		var customReg = new RegExp('(\\$\\{' + ref + '\\})', 'gi');
		content = content.replace(customReg, values[ref]);
	});

	return content;
}

if (module.parent == undefined) {
	var t = module.exports('<ux-${compName}></ux-${compName}>', { compName: 'test' });
	console.log(t);
}