'use strict';

var plug = require(__dirname+'/../index.js').plugins;

module.exports = function(name) {
	return plug.create({
		name: name || 'native'
	});
};
