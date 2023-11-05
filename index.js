import mimicFunction from 'mimic-function';

export default function pTime(asyncFunction) {
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
}

const log = (function_, promise) => {
	console.log(`Promise from ${function_.displayName || function_.name || '[anonymous]'} resolved in ${promise.time} ms`);
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
