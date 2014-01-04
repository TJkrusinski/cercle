'use strict';

var events = require('events'),
	publish = require(__dirname+'/publish.js'),
	subs = require(__dirname+'/subscribers.js');

exports.plugs = {};

exports.pluginCallback = function(obj) {
	if (!obj.name) return;

	var events = new events.EvenEmitter;

	obj.events = events;

	events.publish = exports.publish;

	exports.plugs[obj.name] = obj;

	return events;
};
