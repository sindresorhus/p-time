import test from 'ava';
import delay from 'delay';
import inRange from 'in-range';
import m from './';

test(async t => {
	const timedDelay = m(delay);
	const promise = timedDelay(500);
	await promise;
	t.true(inRange(promise.time, 500, 550));
});
