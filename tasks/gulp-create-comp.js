var exec = require('../utils/child-runner');

module.exports = function (compName) {
	if (typeof (compName) !== 'string' || compName.trim() == '') throw new Error('component needs a name');

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
			exec()
		})
		.catch(err => {
			console.log('fail', err);
		})
}

if(module.parent == undefined) {
	console.log('fasda');
}