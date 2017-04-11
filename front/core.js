var Ractive = require('ractive/ractive.min');
var components = require('../tmp/components');

window.addEventListener('DOMContentLoaded', function (){
	var ractive = new Ractive({
		el: document.body,
		template: document.body.innerHTML,

		components: components,

		oncomplete: function () {
			console.log('DONE');
		}
	})
})