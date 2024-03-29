export type PromiseWithTime<ValueType> = {
	/**
	The elapsed time in milliseconds.
	*/
	readonly time?: number;
} & Promise<ValueType>;

declare const pTime: {
	/**
	Measure the time a promise takes to resolve.

	@param asyncFunction - Promise-returning/async function.
	@returns A decorated version of `asyncFunction`.

	@example
	```
	import pTime from 'p-time';
	import {execa} from 'execa';

	const promise = pTime(execa)('sleep', ['1']);

	await promise;
	console.log(promise.time);
	//=> 1016
	```
	*/
	<ArgumentsType extends unknown[], ReturnType>(
		asyncFunction: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => PromiseWithTime<ReturnType>;

	/**
	Measure the time a promise takes to resolve. Logs the elapsed time.

	@param asyncFunction - Promise-returning/async function.
	@returns A decorated version of `asyncFunction`.
	*/
	log<ArgumentsType extends unknown[], ReturnType>(
		asyncFunction: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => PromiseWithTime<ReturnType>;
};

export default pTime;
