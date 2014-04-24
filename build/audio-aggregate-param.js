!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.audioAggregateParam=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var AggregateParam = module.exports = function() {
    this.params = [];   
    this.allOnes = true;
}

AggregateParam.prototype.add = function(param, factor) {
    
    factor = (typeof factor === 'undefined') ? 1.0 : factor;
    if (factor != 1) {
        this.allOnes = false;
    }

    this.params.push({
        param   : param,
        factor  : factor
    });

}

Object.defineProperty(AggregateParam.prototype, 'value', {
    get: function() {
        throw new Error("sorry you can't read the value of an aggregate parameter");
    },
    set: function(v) {
        this.params.forEach(function(p) {
            p.param.value = p.factor * v;
        });
    }
});

AggregateParam.prototype.setValueAtTime = function(value, startTime) {
    this.params.forEach(function(p) {
        p.param.setValueAtTime(value * p.factor, startTime);
    });
}

AggregateParam.prototype.linearRampToValueAtTime = function(value, endTime) {
    this.params.forEach(function(p) {
        p.param.linearRampToValueAtTime(value * p.factor, endTime);
    });   
}

AggregateParam.prototype.exponentialRampToValueAtTime = function(value, endTime) {
    this.params.forEach(function(p) {
        p.param.exponentialRampToValueAtTime(value * p.factor, endTime);
    });
}

AggregateParam.prototype.setTargetAtTime = function(timeConstant, target, startTime) {
    this.params.forEach(function(p) {
        p.param.exponentialRampToValueAtTime(timeConstant, target * p.factor, startTime);
    });
}

AggregateParam.prototype.setValueCurveAtTime = function(values, startTime, duration) {
    if (this.allOnes) {
        this.params.forEach(function(p) {
            p.param.setValueCurveAtTime(values, startTime, duration);
        });
    } else {

        var numValues = values.length;

        this.params.forEach(function(p) {

            var factor      = p.factor,
                myValues    = new Float32Array(numValues);
            
            for (var i = 0; i < numValues; ++i) {
                myValues[i] = values[i] * factor;
            }

            p.param.setValueCurveAtTime(myValues, startTime, duration);
            
        });
    }
}

AggregateParam.prototype.cancelScheduledValues = function() {
    this.params.forEach(function(p) {
        p.param.cancelScheduledValues();
    });
}
},{}]},{},[1])
(1)
});