# p-time

> Measure the time a promise takes to resolve

## Install

```
$ npm install p-time
```

## Usage

```js
import pTime from 'p-time';
import execa from 'execa';

const promise = pTime(execa)('sleep', ['1']);

await promise;
console.log(promise.time);
//=> 1016
```

## API

### pTime(asyncFunction)

Returns a decorated version of `asyncFunction` that when called returns a `Promise` with a `time` property of the elapsed time in milliseconds.

### pTime.log(asyncFunction)

Returns a decorated version of `asyncFunction` that when called logs the elapsed time in milliseconds of the `Promise`.

#### asyncFunction

Type: `Function`

Promise-returning/async function.

## Related

- [p-log](https://github.com/sindresorhus/p-log) - Log the value/error of a promise
- [More…](https://github.com/sindresorhus/promise-fun)
