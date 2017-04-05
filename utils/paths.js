var path = require('path');

//	paths object
module.exports = paths = {};

//	global paths
paths.global = {};
var root = paths.global.projectRoot = __dirname;

//	frontend paths
var front = paths.front = {};
front.components = path.join(root, 'front/components');
front.styles = path.join(root, 'front/scss');