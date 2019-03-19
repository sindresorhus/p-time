'use strict';
const mimicFn = require('mimic-fn');

const pTime = promiseFactory => {
	const wrappedFactory = (...arguments_) => {
		const start = Date.now();

		const retPromise = (async () => {
			try {
				const result = await promiseFactory(...arguments_);
				retPromise.time = Date.now() - start;
				return result;
			} catch (error) {
				retPromise.time = Date.now() - start;
				throw error;
			}
		})();

		return retPromise;
	};

	mimicFn(wrappedFactory, promiseFactory);

	return wrappedFactory;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || fn.name || '[anonymous]'} resolved in ${promise.time} ms`);
};

module.exports = pTime;
module.exports.default = pTime;

module.exports.log = promiseFactory => {
	const wrappedFactory = pTime(promiseFactory);

	return (...arguments_) => {
		const promise = wrappedFactory(...arguments_);

		(async () => {
			try {
				await promise;
				log(wrappedFactory, promise);
			} catch (error) {
				log(wrappedFactory, promise);
			}
		})();

		return promise;
	};
};
