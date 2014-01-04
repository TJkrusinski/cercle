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
 *	Unsubscribe a topic
 *	@method unsubscribe
 *	@param {String} topic
 *	@param {Object} [subscriber]
 *	@param {Function} callback
 */
exports.unsubscribe = function(topic, subscriber, callback) {
	if (!callback && subscriber && typeof subscriber == 'function') {
		callback = subscriber;
		subscriber = undefined;
	};

	if (subscriber) return removeSubscriber(topic, subscriber, callback);
	return removeAll(topic, callback);
};

/**
 *	Remove a subscriber
 *	@method removeSubscriber
 *	@param {String} topic
 *	@param {Object} [subscriber]
 *	@param {Function} callback
 */
function removeSubscriber (topic, subscriber, callback) {
	if (!subscriber || typeof subscriber != 'string') return callback(true, 'Invalid subscriber to remove');
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
 *	Remove all subscribers for a topic
 *	@method removeAll
 *	@param {String} topic
 *	@param {Function} callback
 */
function removeAll (topic, callback) {
	db.del('subs::'+topic, function(err, data){
		if (err) return callback(true, 'Trouble removing all subscribers from topic');
		return callback(false, null);
	});
};

/**
 *	Get subscribers for a topic
 *	@method get
 *	@param {String} topic
 *	@param {Function} callback
 */
exports.get = function(topic, callback) {
	db.get('subs::'+topic, function(err, data){
		if (err && data) return callback(true, 'Trouble finding subscribers');
		data = JSON.parse(data || '{}');
		return callback(false, subsToArray(data));
	});
};

function subsToArray (subs) {
	var subbers = [];
	for (var key in subs) subbers.push(subs[key]);
	return subbers;
};
