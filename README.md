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

### Interfacing natively 

You can interact with cercle in Node programitically. 

```javascript
var cercle = require('cercle');

```

### Plugins


```javascript
// example to come
```

### Security

Security will likely be enforce on the plug in level, not in cercle itself.
