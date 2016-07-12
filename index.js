'use strict';
module.exports = fn => {
	const ret = function () {
		const start = Date.now();
		// TODO: use rest/spread when Node.js 6 is targeted
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
