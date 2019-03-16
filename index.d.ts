export interface PromiseWithTime<T> extends Promise<T> {
	/**
	The elapsed time in milliseconds.
	*/
	readonly time?: number;
}

declare const pTime: {
	/**
	Measure the time a promise takes to resolve.

	@param input - Promise-returning/async function.
	@returns A decorated version of `input`.
	*/
	<ArgumentsType extends unknown[], ReturnType>(
		input: (...args: ArgumentsType) => PromiseLike<ReturnType>
	): (...args: ArgumentsType) => PromiseWithTime<ReturnType>;

	/**
	Measure the time a promise takes to resolve. Logs the elapsed time.

	@param input - Promise-returning/async function.
	@returns A decorated version of `input`.
	*/
	log<ArgumentsType extends unknown[], ReturnType>(
		input: (...args: ArgumentsType) => PromiseLike<ReturnType>
	): (...args: ArgumentsType) => PromiseWithTime<ReturnType>;
};

export default pTime;
