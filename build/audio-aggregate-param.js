!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.audioAggregateParam=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AggregateParam = module.exports = function() {
    this.params = [];   
}

AggregateParam.prototype.add = function(param, factor) {
    this.params.push({
        param   : param,
        factor  : (typeof factor === 'undefined') ? 1.0 : factor
    });
}

Object.defineProperty(AggregateParam, 'value', {
    get: function() {
        throw new Error("sorry you can't read the value of an aggregate parameter");
    },
    set: function(v) {
        this.params.forEach(function(p) {
            p.param.value = p.factor * v;
        });
    }
});

AggregateParam.prototype.setValueAtTime = function() {

}

AggregateParam.prototype.linearRampToValueAtTime = function() {
    
}

AggregateParam.prototype.exponentialRampToValueAtTime = function() {

}

AggregateParam.prototype.setTargetAtTime = function() {

}

AggregateParam.prototype.setValueCurveAtTime = function() {

}

AggregateParam.prototype.cancelScheduledValues = function() {
    this.params.forEach(function(p) {
        p.param.cancelScheduledValues();
    });
}
},{}]},{},[1])
(1)
});