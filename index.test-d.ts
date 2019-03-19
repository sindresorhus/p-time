import {expectType} from 'tsd-check';
import pTime, {PromiseWithTime} from '.';

expectType<(input: number) => PromiseWithTime<number>>(
	pTime(async (input: number) => input)
);
expectType<number | undefined>(pTime(async (input: number) => input)(1).time);

expectType<(input: number) => PromiseWithTime<number>>(
	pTime.log(async (input: number) => input)
);
