var Ractive = require('ractive');
var Templates = require('../../../tmp/templates');

module.exports = Ractive.extend({
	template: Templates["ux-editor"],

	data: function () {
		return {
			allowEdit: true,
			allowLayout: true,
			allowDelete: true,

			pageLock: {
				root: '/',
				locked: false
			}
		}
	}
})