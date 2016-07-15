'use strict';
const promiseTime = fn => {
	const ret = function () {
		const start = Date.now();
		// TODO: use rest/spread when Node.js 6 is targeted
		const promise = fn.apply(null, arguments);

		const retPromise = promise.then(res => {
			retPromise.time = Date.now() - start;
			return res;
		}, err => {
			retPromise.time = Date.now() - start;
			throw err;
		});

		return retPromise;
	};

	ret.displayName = fn.name;

	return ret;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || '[anonymous]'} resolved in ${promise.time} ms`);
};

module.exports = promiseTime;

module.exports.log = fn => {
	const wrapper = promiseTime(fn);

	return function () {
		// TODO: use rest/spread when Node.js 6 is targeted
		const promise = wrapper.apply(null, arguments);

		promise
			.then(res => {
				log(wrapper, promise);
				return res;
			})
			.catch(err => {
				log(wrapper, promise);
				throw err;
			});

		return promise;
	};
};
