'use strict';
const mimicFn = require('mimic-fn');

const pTime = asyncFunction => {
	const wrappedFunction = (...arguments_) => {
		const start = Date.now();

		const returnPromise = (async () => {
			try {
				const result = await asyncFunction(...arguments_);
				returnPromise.time = Date.now() - start;
				return result;
			} catch (error) {
				returnPromise.time = Date.now() - start;
				throw error;
			}
		})();

		return returnPromise;
	};

	mimicFn(wrappedFunction, asyncFunction);

	return wrappedFunction;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || fn.name || '[anonymous]'} resolved in ${promise.time} ms`);
};

module.exports = pTime;
// TODO: Remove this for the next major release
module.exports.default = pTime;

module.exports.log = asyncFunction => {
	const wrappedFunction = pTime(asyncFunction);

	return (...arguments_) => {
		const promise = wrappedFunction(...arguments_);

		(async () => {
			try {
				await promise;
				log(wrappedFunction, promise);
			} catch (error) {
				log(wrappedFunction, promise);
			}
		})();

		return promise;
	};
};
