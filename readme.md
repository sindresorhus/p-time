# p-time [![Build Status](https://travis-ci.org/sindresorhus/p-time.svg?branch=master)](https://travis-ci.org/sindresorhus/p-time)

> Measure the time a promise takes to resolve


## Install

```
$ npm install p-time
```


## Usage

```js
const pTime = require('p-time');
const execa = require('execa');

(async () => {
	const promise = pTime(execa)('sleep', ['1']);

	await promise;
	console.log(promise.time);
	//=> 1016
})();
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


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
