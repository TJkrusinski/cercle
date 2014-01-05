'use strict';

var plugins = require(__dirname+'/lib/plugins');

exports.plugins = {
	create: plugins.create
};

/**
 *	Return a js based pub/sub interface
 */
exports.native = function(name) {
	return new require(__dirname+'/lib/native.js')(name);
};
