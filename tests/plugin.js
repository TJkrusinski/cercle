'use strict';

var assert = require('chai').assert,
	index = require(__dirname+'/../index.js');

var plugin1 = { };

plugin1.init = function(cercle, opts) {
	var pluggy = cercle({
		name: 'My plugin1 name',
	});

	return pluggy;
};

var plugin2 = { };

plugin2.init = function(cercle, opts) {
	var pluggy = cercle({
		name: 'My plugin2 name',
	});

	return pluggy;
};

var plug1 = index.plugin(plugin1, {foo:'bar'});
var plug2 = index.plugin(plugin2, {foo:'bar'});

describe('the plugins are ok', function(){
	it('asserts they are find', function(){
		assert.ok(plug1);
		assert.ok(plug2);
	});
});

describe('plugin#unsubscribeAll()', function(){
	it('remove all subscribers', function(d){
		plug1.unsubscribeAll('foo', function(err){
			plug2.unsubscribeAll('foo', function(err2){
				assert.isFalse(err);
				assert.isFalse(err2);
				d();
			});
		});
	});
});

describe('plug1#subscribe()', function(){
	it('subscribes to a topic foo', function(d){
		plug1.subscribe('foo', {id:'my user id'}, function(err){
			assert.isFalse(err);
			d();
		});
	});
});

describe('plug2#publish()', function(){
	it('plubishes to a topic foo', function(d){
		plug1.events.on('message', function(message){
			assert.isObject(message);
			d();
		});

		plug2.publish({
			topic: 'foo',
			payload: 'your mom'
		});
	});
});
