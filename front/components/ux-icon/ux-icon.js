var Ractive = require('ractive/ractive.min');
var Templates = require('../../../tmp/templates');

module.exports = Ractive.extend({
	template: Templates['ux-icon'],

	data: function () {
		return {
			type: 'chevron-up'
		}
	}
})