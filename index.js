var promisify = require('promisify-node');

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

Function.prototype.promise = function() {
  if (arguments.length > this.length - 1) {
    return Promise.reject(new Error('Too many arguments supplied to function ' + this.name + ', expected ' + (this.length - 1)));
  }

  var args = new Array(this.length - 1);
  args = concat.apply(slice.apply(arguments), args).slice(0, this.length - 1);

  return promisify(this).apply(this, args);
}
