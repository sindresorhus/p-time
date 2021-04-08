import mimicFunction from 'mimic-fn';

const pTime = asyncFunction => {
	const wrappedFunction = (...arguments_) => {
		const start = Date.now();

		const returnPromise = (async () => {
			try {
				return await asyncFunction(...arguments_);
			} finally {
				returnPromise.time = Date.now() - start;
			}
		})();

		return returnPromise;
	};

	mimicFunction(wrappedFunction, asyncFunction);

	return wrappedFunction;
};

const log = (fn, promise) => {
	console.log(`Promise from ${fn.displayName || fn.name || '[anonymous]'} resolved in ${promise.time} ms`);
};

pTime.log = asyncFunction => {
	const wrappedFunction = pTime(asyncFunction);

	return (...arguments_) => {
		const promise = wrappedFunction(...arguments_);

		(async () => {
			try {
				await promise;
			} finally {
				log(wrappedFunction, promise);
			}
		})();

		return promise;
	};
};

export default pTime;
