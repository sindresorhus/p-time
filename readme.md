# promise-time [![Build Status](https://travis-ci.org/sindresorhus/promise-time.svg?branch=master)](https://travis-ci.org/sindresorhus/promise-time)

> Measure the time a promise takes to resolve


## Install

```
$ npm install --save promise-time
```


## Usage

```js
const promiseTime = require('promise-time');
const execa = require('execa');

const promise = promiseTime(execa)('sleep', ['1']);

promise.then(() => {
	console.log(promise.time);
	//=> 1016
});
```


## API

### promiseTime(input)

Returns a decorated version of `input` that when called returns a `Promise` with a `time` property of the elapsed time in milliseconds.

### promiseTime.log(input)

Returns a decorated version of `input` that when called logs the elapsed time in milliseconds of the `Promise`.

#### input

Type: `Function`

Promise-returning/async function.


## Related

- [p-log](https://github.com/sindresorhus/p-log) - Log the value/error of a promise
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
