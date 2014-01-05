'use strict';

var level = require('level'),
	db = level('./cercle'),
	uuid = require('uuid').v1;

function noop () {};

/**
 *	Add a subscriber
 *	@method subscribe
 *	@param {String} topic
 *	@param {Object} subscriber
 *	@param {Function} callback
 */
exports.subscribe = function(topic, subscriber, callback) {
	if (!topic || !subscriber) return callback(true, 'Invalid topic or subscriber info');
	subscriber.id = subscriber.id || uuid();

	callback = callback || noop;

	db.get('subs::'+topic, function(err, data){
		if (err && data) return callback(true, 'Trouble getting subscribers to add subscriber to');
		if (!data) data = "{}";

		data = JSON.parse(data);
		data[subscriber.id] = subscriber;

		db.put('subs::'+topic, JSON.stringify(data), function(err){
			if (err) return cb(true, 'Trouble setting subscriber');
			return callback(false, subscriber);
		});
	});

	return subscriber.id;
};

/**
 *	Unsubscribe one subscriber for a topic
 *	@method unsubscribe
 *	@param {String} topic
 *	@param {Object} [subscriber]
 *	@param {Function} callback
 */
exports.unsubscribe = function(topic, subscriber, callback) {
	if (!topic) return callback ? callback(true, 'Invalid topic to unsubscribe') : undefined;

	if (!subscriber || typeof subscriber != 'string')
		return callback ? callback(true, 'Invalid subscriber to remove') : undefined;
	
	callback = callback || noop;

	db.get('subs::'+topic, function(err, data){
		if (err) return callback(true, 'Trouble finding subscriber to remove');
		data = JSON.parse(data);	
		delete data[subscriber];
		db.put('subs::'+topic, JSON.stringify(data), function(err){
			if (err) return callback(true, 'Unable to save subscribers list');
			return callback(false, subsToArray(data));
		});
	});
};

/**
 *	Unsubscribe all for a topic
 *	@method unsubscribeAll
 *	@param {String} topic
 *	@param {Function} [callback]
 */
exports.unsubscribeAll = function(topic, callback) {
	if (!topic) return callback ? callback(true, 'Invalid topic to unsubscribe') : undefined;

	callback = callback || noop;

	db.del('subs::'+topic, function(err, data){
		if (err) return callback(true, 'Trouble removing all subscribers from topic');
		return callback(false, null);
	});
};

/**
 *	Get subscribers for a topic
 *	@method get
 *	@param {String} topic
 *	@param {String} [plugin]
 *	@param {Function} callback
 */
exports.get = function(topic, plugin, callback) {

	if (!callback && plugin && typeof plugin == 'function') {
		callback = plugin;
		plugin = undefined;
	};

	if (!topic) return callback ? callback(true, 'Invalid topic to get subsribers for') : undefined;

	db.get('subs::'+topic, function(err, data){
		if (err && data) return callback(true, 'Trouble finding subscribers');
		data = JSON.parse(data || '{}');
		var arr;

		if (plugin) {
			arr = [];
			for (var key in data) {
				if (data[key].plugin && data[key].plugin.name == plugin) arr.push(data[key]);
			};
		};

		return callback(false, arr || subsToArray(data));
	});
};

/**
 *	Turn an object of subscriptions into an array
 *	@method subsToArray
 *	@param {Object} subs
 *	@return {Array}
 */
function subsToArray (subs) {
	var subbers = [];
	for (var key in subs) subbers.push(subs[key]);
	return subbers;
};
