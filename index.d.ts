declare namespace pTime {
	interface PromiseWithTime<ValueType> extends Promise<ValueType> {
		/**
		The elapsed time in milliseconds.
		*/
		readonly time?: number;
	}
}

declare const pTime: {
	/**
	Measure the time a promise takes to resolve.

	@param asyncFunction - Promise-returning/async function.
	@returns A decorated version of `asyncFunction`.

	@example
	```
	import pTime = require('p-time');
	import execa = require('execa');

	(async () => {
		const promise = pTime(execa)('sleep', ['1']);

		await promise;
		console.log(promise.time);
		//=> 1016
	})();
	```
	*/
	<ArgumentsType extends unknown[], ReturnType>(
		asyncFunction: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => pTime.PromiseWithTime<ReturnType>;

	/**
	Measure the time a promise takes to resolve. Logs the elapsed time.

	@param asyncFunction - Promise-returning/async function.
	@returns A decorated version of `asyncFunction`.
	*/
	log<ArgumentsType extends unknown[], ReturnType>(
		asyncFunction: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => pTime.PromiseWithTime<ReturnType>;

	// TODO: Remove this for the next major release
	default: typeof pTime;
};

export = pTime;
