'use strict';

var events = require('events'),
	publish = require(__dirname+'/publish.js'),
	subs = require(__dirname+'/subscribers.js');

exports.plugs = {};

/**
 *	The function passed to the plug in's init method
 *	@method pluginCallback
 *	@param {Object} params
 *	@return {Object} 
 */
exports.pluginCallback = function(params) {
	if (!params.name) return;

	var plugin = new BasePlug;

	plugin.config(params);
	plugin.emitter();

	exports.plugs[params.name] = plugin;

	return plugin;
};

/**
 *	Our plugin base class
 */
var BasePlug = function() { };

/**
 *	Set the config for a plugin
 *	@method config
 *	@param {Object} config
 */
BasePlug.prototype.config = function(config) {
	this.config = config;
};

/**
 *	Get a config key
 *	@method get
 *	@param {String} key
 *	@return {String}
 */
BasePlug.prototype.get = function(key) {
	return this.config[key];
};

/**
 *	Set a config key
 *	@method set
 *	@param {String} key
 *	@param {Object} val
 */
BasePlug.prototype.set = function(key, val) {
	this.config[key] = val;
	return this;
};

BasePlug.prototype.publish = publish;

/**
 *	Subscribe for plugins
 *	@method subscribe
 *	@param {String} topic
 *	@param {Object} obj - the user info for the subscription
 *	@param {Function} [cb]
 */
BasePlug.prototype.subscribe = function(topic, obj, cb) {
	if (!topic) return cb ? cb(true, 'Invalid topic to subscribe') : undefined;

	if (!cb && typeof obj == 'function') {
		cb = obj;
		obj = {};
	};

	if  (typeof obj == 'string') obj = {'id': obj};

	var config = this.config;
	obj = obj || {};

	obj.plugin = config;
	obj.topic = topic;

	subs.subscribe(topic, obj, function(err, data){
		if (cb) cb(err, data);	
	});
};

/**
 *	Unsubscribe for plugins
 *	@method unsubscribe
 *	@param {String} topic
 *	@param {Object} id - the user id for the subscription
 *	@param {Function} [cb]
 */
BasePlug.prototype.unsubscribe = function(topic, id, cb) {
	if (!topic) return cb ? cb(true, 'Invalid topic to unsubscribe') : undefined;
	if (!id) return cb ? cb(true, 'Invalid subscriber to unsubscribe') : undefined;
	cb = cb || noop;
	subs.unsubscribe(topic, id, cb);
};

/**
 *	Unsubscribe all for plugins
 *	@method unsubscribeAll
 *	@param {String} topic
 *	@param {Function} [cb]
 */
BasePlug.prototype.unsubscribeAll = function(topic, cb) {
	if (!topic) return cb ? cb(true, 'Invalid topic to unsubscribe') : undefined;
	cb = cb || noop;
	subs.unsubscribeAll(topic, cb);
};

/**
 *	Create an event emitter for the plugin
 *	@method emitter
 */
BasePlug.prototype.emitter = function() {
	this.events = new events.EventEmitter;
	return this;
};

function noop () { };
