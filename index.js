'use strict';
const mimicFn = require('mimic-fn');

const pTime = asyncFunction => {
	const wrappedFunction = (...arguments_) => {
		const start = Date.now();

		const retPromise = (async () => {
			try {
				const result = await asyncFunction(...arguments_);
				retPromise.time = Date.now() - start;
				return result;
			} catch (error) {
				retPromise.time = Date.now() - start;
				throw error;
			}
		})();

		return retPromise;
	};

	mimicFn(wrappedFunction, asyncFunction);

	return wrappedFunction;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || fn.name || '[anonymous]'} resolved in ${promise.time} ms`);
};

module.exports = pTime;
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
