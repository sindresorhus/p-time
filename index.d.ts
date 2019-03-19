export interface PromiseWithTime<ValueType> extends Promise<ValueType> {
	/**
	The elapsed time in milliseconds.
	*/
	readonly time?: number;
}

declare const pTime: {
	/**
	Measure the time a promise takes to resolve.

	@param asyncFunction - Promise-returning/async function.
	@returns A decorated version of `asyncFunction`.
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
