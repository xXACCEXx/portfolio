var fs = require('fs');
var exec = require('../utils/child-runner');

module.exports = function (compName) {
	if (typeof (compName) !== 'string' || compName.trim() == '') throw new Error('component needs a name');

	try { var lstat = fs.lstatSync(`./front/components/ux-${compName}/`); }
	catch (e) { }
	if (lstat && lstat.isDirectory()) throw new Error(`component already exists! ${compName}`);

	var tmpl = {};

	//	hbs file template
	tmpl.hbs = `<div class="${compName}">
	The ${compName} component
</div>`;

	//	js file template
	tmpl.js = `var Ractive = require('ractive');
var Templates = require('../../../tmp/templates');

module.exports = Ractive.extend({
	template: Templates['${compName}']
})`;

	//	scss file template
	tmpl.scss = `.${compName} { }`;


	//	create folder
	exec('mkdir -p ./front/components/ux-' + compName)
		.then(function (logs) {
			fs.writeFileSync(`./front/components/ux-${compName}/ux-${compName}.js`, tmpl.js);
			fs.writeFileSync(`./front/components/ux-${compName}/ux-${compName}.hbs`, tmpl.hbs);
			fs.writeFileSync(`./front/components/ux-${compName}/ux-${compName}.scss`, tmpl.scss);
		})
		.catch(err => {
			console.log('fail', err);
		})
}

if (module.parent == undefined) {
	console.log('fasda');
}
