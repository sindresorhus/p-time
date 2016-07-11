# promise-time [![Build Status](https://travis-ci.org/sindresorhus/promise-time.svg?branch=master)](https://travis-ci.org/sindresorhus/promise-time)

> Measure the time a `Promise` takes to resolve


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

Returns a decorated version of `input` that when executed returns a `Promise` with a `time` property of the elapsed time in milliseconds.

#### input

Type: `Function`

Promise-returning function.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
