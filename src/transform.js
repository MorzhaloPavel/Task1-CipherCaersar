const Transform = require('stream').Transform;

module.exports = class MyTransform extends Transform {
  constructor(func, shift) {
    super();
    this.func = func
    this.shift = shift
  }
  _transform(chunk, encoding, callback) {
    this.push(this.func(chunk.toString(), this.shift));
    callback();
  }
}