'use strict';

var assert = require('chai').assert,
	subs = require(__dirname+'/../lib/subscribers.js');

var sub = {
	plugin: {
		name: 'plug1'
	}
};

var sub2 = {
	id: 'fooid fooid',
	plugin: {
		name: 'plug2'
	}
};

var sub3 = {
	id: 'I am not an astronaut',
	plugin: {
		name: 'plug3'
	},
};

var id;

describe('subscribers', function(){
	describe('subs#subscribe()', function(){
		it('subscribes a user to a topic', function(d){
			id = subs.subscribe('footopic', sub, function(err, data){
				assert.isString(id);
				assert.isFalse(err);
				assert.isObject(data);
				d();
			});
		});
	});

	describe('subs#subscribe()', function(){
		it('subscribes a user to a topic', function(d){
			subs.subscribe('footopic', sub2, function(err, data){
				assert.isFalse(err);
				assert.isObject(data);
				d();
			});
		});
	});

	describe('subs#subscribe()', function(){
		it('subscribes a user to a topic', function(d){
			subs.subscribe('footopic', sub3, function(err, data){
				assert.isFalse(err);
				assert.isObject(data);
				d();
			});
		});
	});

	describe('subs#get()', function(){
		it('gets subs for a topic', function(d){
			subs.get('footopic', function(err, data){
				assert.isFalse(err);
				assert.isArray(data);
				assert.isObject(data[0]);
				assert.ok(data.length > 0);
				d();
			});
		});
	});
	
	describe('subs#unsubscribe()', function(){
		it('unsubscribe from a topic', function(d){
			subs.unsubscribe('footopic', id, function(err, data){
				assert.isFalse(err);
				d();
			});
		});
	});

	describe('subs#get()', function(){
		it('gets subs for a topic', function(d){
			subs.get('footopic', function(err, data){
				assert.isFalse(err);
				assert.isObject(data[0].plugin);
				assert.isArray(data);
				assert.ok(data.length > 0);
				d();
			});
		});
	});

	describe('subs#get()', function(){
		it('gets subs for a topic for a plugin', function(d){
			subs.get('footopic', 'plug3', function(err, data){
				assert.isFalse(err);
				assert.isObject(data[0]);
				assert.isArray(data);
				assert.equal(data[0].plugin.name, 'plug3');
				assert.ok(data.length > 0);
				d();
			});
		});
	});

	describe('subs#unsubscribeAll()', function(){
		it('unsubscribes all users', function(d){
			subs.unsubscribeAll('footopic', function(err, data){
				assert.isFalse(err);
				d();
			});
		});
	});

	describe('subs#get()', function(){
		it('gets subs for a topic', function(d){
			subs.get('footopic', function(err, data){
				assert.isFalse(err);
				assert.isArray(data);
				assert.ok(data.length == 0);
				d();
			});
		});
	});
});
