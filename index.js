'use strict';
module.exports = fn => {
	const ret = function () {
		const start = Date.now();
		const promise = fn.apply(null, arguments);

		const retPromise = promise.then(res => {
			retPromise.time = Date.now() - start;
			return res;
		});

		return retPromise;
	};

	ret.displayName = fn.name;

	return ret;
};
