'use strict';
const mimicFn = require('mimic-fn');

const pTime = fn => {
	const wrappedFunction = function (...arguments_) {
		const start = Date.now();
		const promise = fn(...arguments_);

		const retPromise = promise.then(result => {
			retPromise.time = Date.now() - start;
			return result;
		}, error => {
			retPromise.time = Date.now() - start;
			throw error;
		});

		return retPromise;
	};

	mimicFn(wrappedFunction, fn);

	return wrappedFunction;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || fn.name || '[anonymous]'} resolved in ${promise.time} ms`);
};

module.exports = pTime;
module.exports.default = pTime;

module.exports.log = fn => {
	const wrapper = pTime(fn);

	return function (...arguments_) {
		const promise = wrapper(...arguments_);

		promise
			.then(result => {
				log(wrapper, promise);
				return result;
			})
			.catch(error => {
				log(wrapper, promise);
				throw error;
			});

		return promise;
	};
};
