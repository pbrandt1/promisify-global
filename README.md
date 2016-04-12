### Adds .promise() to 🚨Function.prototype🚨

```
npm install promisify-global
```

If you would normally call `some_function(function(e, val){...})`, instead you can get a promise by using `some_function.promise()`.


#### Example: is_doge

```javascript
require('promisify-global');

// is_doge normally uses callbacks
function is_doge(arg, cb) {
  if (arg !== 'doge') {
    cb(arg + ' not doge')
  } else {
    cb(null, 'wow such doge')
  }
}

// but hey it's so easy to get a promise for it
var doge_promise = is_doge.promise('doge');

doge_promise.then(function(val) {
  console.log('wof!')
})
```

IT'S JUST THAT SIMPLE.

there could be no negative fallout from adding `.promise` to `Function.prototype`.  like if it does somehow mess up everything, that probably means you've got 99 problems already, and trying to use this library won't really help solve those problems.

yep.

...

...

...

adding to Function.prototype is not bad at all.

...

...

...

...

...

...

...

...

...

...

...

...

![Flowey](http://t5.rbxcdn.com/ea706d767f1679133192d848d6d2e594)
