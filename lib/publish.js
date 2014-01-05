'use strict';

var subs = require(__dirname+'/subscribers'),
	plugs = require(__dirname+'/plugins');

/**
 *	Send a message through the system
 *	@method publish
 *	@param {String} topic
 *	@param {Object} message
 *	@param {Function} [cb]
 */
exports.publish = function(topic, message, cb) {
	if (!topic || !message) return cb ? cb(true, 'Invalid topic or message') : undefined;
	
	subs.get(topic, function(err, data){
		if (err) return cb ? cb(true, data) : undefined;

		data.forEach(function(sub){
			
		});
	});
};
