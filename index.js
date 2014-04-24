var AggregateParam = module.exports = function() {
    this.params = [];   
}

AggregateParam.prototype.add = function(param, factor) {
    this.params.push({
        param   : param
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