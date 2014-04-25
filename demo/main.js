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