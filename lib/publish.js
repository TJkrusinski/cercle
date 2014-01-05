'use strict';

var subs = require(__dirname+'/subscribers'),
	plugs = require(__dirname+'/plugins');

/**
 *	Send a message through the system
 *	@method publish
 *	@param {Object} message
 *	@param {Function} [cb]
 */
module.exports = function(message, cb) {
	if (!message || !message.topic) return cb ? cb(true, 'Invalid topic or message passed') : undefined;
	
	subs.get(message.topic, function(err, data){
		if (err) return cb ? cb(true, data) : undefined;

		data.forEach(function(sub){
			if (!sub.plugin.name) return;
			if (!plugs.plugs[sub.plugin.name]) return;
			plugs.plugs[sub.plugin.name].events.emit('message', message);
		});
	});
};
