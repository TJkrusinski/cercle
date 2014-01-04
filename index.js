'use strict';

var plugins = require(__dirname+'/lib/plugins');

exports.plug = function(plug) {
	plug.init(plugins.pluginCallback);
};
