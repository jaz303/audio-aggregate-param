# audio-aggregate-param

Group multiple `AudioParam`s into a single aggregate parameter for centralised manipulation.

## Installation

### Browserify

    $ npm install audio-aggregate-param

### UMD

```javascript
// some code yadda yadda
```

## Example

```javascript
var osc1 = context.createOscillator();
var osc2 = context.createOscillator();
var osc3 = context.createOscillator();

var AudioAggregateParam = require('audio-aggregate-param');

var param = new AudioAggregateParam();
param.add(osc1.frequency);
param.add(osc2.frequency, 2);
param.add(osc3.frequency, 4);

// set frequency of osc1, osc2 and osc3
// osc1 = 220, osc2 = 440, osc3 = 880
param.cancelScheduledValues(context.currentTime);
param.setValueAtTime(220, context.currentTime);

// ramp oscillator frequencies over the next 2 seconds
// osc -> 440, osc2 -> 880, osc3 -> 1760
param.exponentialRampToValueAtTime(context.currentTime + 2, 440);

osc1.connect(context.destination);
osc2.connect(context.destination);
osc3.connect(context.destination);

osc1.start(0);
osc2.start(0);
osc3.start(0);
```

## API

#### `aggregate = new AudioAggregateParam()`

#### `aggregate.add(param, [scaleFactor])`

Add a new `AudioParam` instance to this aggregate. If specified, all values assigned to this parameter - either directly or via one of the ramping/curve functions - will be multiplied by `scaleFactor`.

#### `AudioParam` methods

The following are proxied to the corresponding method of each aggregated `AudioParam`:

  * `aggregate.value = newValue`
  * `aggregate.setValueAtTime(value, startTime)`
  * `aggregate.linearRampToValueAtTime(value, endTime)`
  * `aggregate.exponentialRampToValueAtTime(value, endTime)`
  * `aggregate.setTargetAtTime(timeConstant, target, startTime)`
  * `aggregate.setValueCurveAtTime(values, startTime, duration)`

## License

ISC