const _ = require('lodash')

var Reader = function (fn) {
    this.f = fn;
};


Reader.ask = function () {
    return new Reader(_.identity);
};


Reader.asks = function (fn) {
    return new Reader(fn);
};

Reader.prototype.run = function (ctx) {
    return this.f(ctx);
};



// create and return a new Reader instance
// ignoring the previous context
// provide a new function that always returns fn
// fn independent of the parameters its called with
Reader.prototype.unit = function (fn) {
    return new Reader(_.constant(fn));
};



Reader.prototype.flatMap = function (k) {
    return new Reader(function (r) {
        return k.call(this, this.run(r)).run(r);
    }.bind(this));
};

var greet = function (name) {
    return Reader.ask().flatMap(function (ctx) {
        return this.unit(ctx + ", " + name);
    });
};

var example0 = function () {
    console.log(greet("JavaScript").run("Hi"));
};

example0();
