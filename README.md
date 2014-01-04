## Cercle

An anything in, anything out publish/subscribe system based off plugins. 

Cercle can interface with custom built plugins that are an abstraction around a protocol. For instance, the HTTP plugin let's you create pub/sub around a RESTful API and the redis plugin lets you use redis for pub/sub but deliver messages to the other plugins.

### Protocol

#### Messages

Messages are JSON encoded and have a few required properties.

```javascript
{
	"topic": "my topic",
	"key": "your api key",
	"handler": "name of the plugin"
	"data": {
		// payload
	},
	plugin: {
		// plugin specific data
	}
}
```

### Interfacing natively 

You can interact with cercle in Node programitically. To send a message into Cercle, you can `require('cercle')` and simply call `cercle.publish(message)`. The message should have the required keys above. Likewise, to get messages out, call `cercle.subscribe('topic')`, then listen for the `message` event.

```javascript

var cercle = require('cercle');

cercle.subscribe('mytopic');

cercle.on('message', function(data){
	console.log(data);
});

cercle.publish(message);

```

### Plugins

Plugins are passed instances of `EventEmitter` via the plugin's `init` method. To add a plugin, `require('cercle').plug(myPlugin)`;

```javascript
// myPlugin.js

exports.init = function(cercle) {
	var events = cercle({
		name: 'myplugin',
		
	});

	// do stuff if there is an error, return false;
	if (errAfterDoingStuff) return false;

	events.on('message', eventHandler);

	exports.events = events;

	// I'm good, so return true
	return true;
};

function eventHandler (data) {
	// do stuff with data
	
};

function myInternalEventHandler (data) {
	data.topic = 'mytopic';
	data.key = 'myauthkey';
	
	exports.events.publish(data);
};

```

### Security

I am not a security expert, so I am looking for some guidance on how to implement a proper security system.
