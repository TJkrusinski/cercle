'use strict';

var assert = require('chai').assert,
	subs = require(__dirname+'/../lib/subscribers.js'),
	plug = require(__dirname+'/../lib/plugins.js');

describe('plugins', function(){
	describe('plug#pluginCallback()', function(){
		it('calls the function and returns an event emitter', function(){
			var obj = plug.pluginCallback({
				name: 'test',
			});

			assert.ok(obj);
			assert.isObject(plug.plugs.test);
		});
	});

	describe('plug#get()', function(){
		it('gets a config key for a plugin', function(){
			var key = plug.plugs.test.get('name');
			assert.equal(key, 'test');
		});
	});

	describe('plug#set()', function(){
		it('sets a config key for a plugin', function(){
			plug.plugs.test.set('foo', 'bar');
			var key = plug.plugs.test.get('foo');
			assert.equal(key, 'bar');
		});
	});

	describe('plug#events#on()', function(){
		it('emits an event', function(d){
			plug.plugs.test.events.on('message', function(message){
				assert.ok(message);
				d();
			});

			plug.plugs.test.events.emit('message', 'message');
		});
	});

	describe('plug#subscribe()', function(){
		it('subscribes to a topic', function(d){
			plug.plugs.test.subscribe('foobar', {id:'myid'}, function(err, data){
				assert.isFalse(err);
				// assert that the plugin passed the right info
				assert.equal(data.plugin.name, 'test');
				d();
			});
		});
	});

	describe('plug#subscribe()', function(){
		it('subscribes to a topic', function(d){
			plug.plugs.test.subscribe('foobar', {id:'myid2'}, function(err, data){
				assert.isFalse(err);
				// assert that the plugin passed the right info
				assert.equal(data.plugin.name, 'test');
				d();
			});
		});
	});

	describe('plug#unsubscribe()', function(){
		it('subscribes to a topic', function(d){
			plug.plugs.test.subscribe('foobar', 'myid2', function(err, data){
				assert.isFalse(err);
				d();
			});
		});
	});

	describe('plug#unsubscribe()', function(){
		it('subscribes to a topic', function(d){
			plug.plugs.test.subscribe('foobar', 'myid2', function(err, data){
				assert.isFalse(err);
				d();
			});
		});
	});
});
