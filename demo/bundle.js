(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AudioAggregateParam = require('../');

window.init = function() {

  var ctx = new window.webkitAudioContext();

  var param = new AudioAggregateParam();

  var gain = ctx.createGain();

  [1,2,4].forEach(function(f) {
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    param.add(osc.frequency, f);
    osc.connect(gain);
    osc.start(0);
  });

  var now = ctx.currentTime;

  param.cancelScheduledValues(now);
  param.setValueAtTime(220, now);

  param.linearRampToValueAtTime(880, ctx.currentTime + 4);

  gain.connect(ctx.destination);

  setTimeout(function() {
    gain.gain.value = 0;
  }, 5000);

}
},{"../":2}],2:[function(require,module,exports){
var AggregateParam = module.exports = function() {
    this.params = [];   
    this.allOnes = true;
}

AggregateParam.prototype.add = function(param, factor) {

    if (!(param instanceof AudioParam)) {
        throw new Error("supplied argument is not an AudioParam");
    }
    
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

        var numValues   = values.length,
            myValues    = new Float32Array(numValues);

        this.params.forEach(function(p) {

            var factor = p.factor;
            
            for (var i = 0; i < numValues; ++i) {
                myValues[i] = values[i] * factor;
            }

            p.param.setValueCurveAtTime(myValues, startTime, duration);
            
        });
    }
}

AggregateParam.prototype.cancelScheduledValues = function(time) {
    this.params.forEach(function(p) {
        p.param.cancelScheduledValues(time);
    });
}
},{}]},{},[1])