'use strcit';

var index = require(__dirname+'/../index.js'),
	assert = require('chai').assert;

var cerc1, cerc2;

describe('plugins#native()', function(){
	it('creates an instance of the native plugin', function(d){
		cerc1 = index.native('foobar');
		cerc2 = index.native('foobiz');
		cerc1.unsubscribeAll('cerc');
		assert.ok(cerc1);
		assert.isFunction(cerc1.subscribe);
		d();
	});
});

describe('cerc1#subscribe()', function(){
	it('subscribes to cerc', function(){
		cerc1.subscribe('cerc');
	});
});

describe('cerc2#publish()', function(){
	it('publishes a message to cerc', function(d){
		cerc1.events.on('message', function(data){
			assert.isObject(data);
			d();
		});

		cerc2.publish({
			topic: 'cerc',
			payload: {
				foo: 'bar'
			}
		}, function(err, data){
			console.log(err, data);
		});
	});
});
