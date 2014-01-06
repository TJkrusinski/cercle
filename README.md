## Cercle

An anything in, anything out publish/subscribe system based off plugins. Subscibers are managed in leveldb.

Cercle can interface with custom built plugins that are an abstraction around a protocol. For instance, the HTTP plugin let's you create pub/sub around a RESTful API and the redis plugin lets you use redis for pub/sub but deliver messages to the other plugins.

### Protocol

#### Messages

Messages are JSON encoded and have a few required properties.

```javascript
{
	"topic": "my topic",
	"key": "your api key",
	"data": {
		// payload
	},
	plugin: {
		// plugin specific data
	}
}
```

### Plugins

Plugins allow you to interface with the pub/sub system. Plugins should expose an init method to allow for cercle to initialize it. The init method is passed a function that will return an object with access to cercle. The plugin you create should wrap the functionality of the returned object to allow you to interface with whatever protocol you are working with. Plugins are meant to be inclusive, their interfaces to the network or whatever are to be within themselves. 

```javascript

var myPlugin = {};

myPlugin.init = function(cercle, options) {

	var interface = cercle({
		name: 'plugin name'
	});

	interface.on('message', this.handleMessage);

	this.subscribe = function(topic) {
		return interface.subscribe(topic);
	};

	this.unsubscribe = function(topic, userId) {
		return interface.subscribe(topic, userId);
	};

	return this;
};

myPlugin.handleMessage = function(message) {

};

module.exports = myPlugin;
```

### Plugin methods

The following methods are on the object returned from calling the function in your plugin callback.

```javascript
/**
 *	Set the config for a plugin
 *	@method config
 *	@param {Object} config
 */
plugin.config = function(config) { };

/**
 *	Get a config key
 *	@method get
 *	@param {String} key
 *	@return {String}
 */
plugin.get = function(key) { };

/**
 *	Set a config key
 *	@method set
 *	@param {String} key
 *	@param {Object} val
 */
plugin.set = function(key, val) { };

/**
 *	Send a message through the system
 *	@method publish
 *	@param {Object} message
 *	@param {Function} [cb]
 */
plugin.publish = function(message, cb) { };

/**
 *	Subscribe for plugins
 *	@method subscribe
 *	@param {String} topic
 *	@param {Object} obj - the user info for the subscription
 *	@param {Function} [cb]
 */
plugin.subscribe = function(topic, obj, cb) { };

/**
 *	Unsubscribe for plugins
 *	@method unsubscribe
 *	@param {String} topic
 *	@param {Object} id - the user id for the subscription
 *	@param {Function} [cb]
 */
plugin.unsubscribe = function(topic, id, cb) { };

/**
 *	Unsubscribe all for plugins
 *	@method unsubscribeAll
 *	@param {String} topic
 *	@param {Function} [cb]
 */
plugin.unsubscribeAll = function(topic, cb) { };

/**
 *	Instance of EventEmitter
 *	@param events
 */
plugin.events

```

### Using a plugin

```javascript

var cercle = require('cercle'),
	httpCercle = require('cercle-http');

var http = cerlce.plugin(httpCercle, {
	// options object
});

```

### Security

Security will likely be enforced on the plug in level, not in cercle itself.

## Running tests

`$ npm test`

## License

(The MIT License)

Copyright (c) 2013 TJ Krusinski &lt;tjkrus@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
