'use strict';

var plugins = require(__dirname+'/lib/plugins');

exports.plugin = function(plug, options) {
	return plug.init(plugins.pluginCallback, options);
};
