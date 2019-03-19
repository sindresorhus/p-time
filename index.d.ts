export interface PromiseWithTime<ValueType> extends Promise<ValueType> {
	/**
	The elapsed time in milliseconds.
	*/
	readonly time?: number;
}

declare const pTime: {
	/**
	Measure the time a promise takes to resolve.

	@param promiseFactory - Promise-returning/async function.
	@returns A decorated version of `promiseFactory`.
	*/
	<ArgumentsType extends unknown[], ReturnType>(
		promiseFactory: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => PromiseWithTime<ReturnType>;

	/**
	Measure the time a promise takes to resolve. Logs the elapsed time.

	@param promiseFactory - Promise-returning/async function.
	@returns A decorated version of `promiseFactory`.
	*/
	log<ArgumentsType extends unknown[], ReturnType>(
		promiseFactory: (...arguments: ArgumentsType) => PromiseLike<ReturnType>
	): (...arguments: ArgumentsType) => PromiseWithTime<ReturnType>;
};

export default pTime;
