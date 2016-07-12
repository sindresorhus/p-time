import test from 'ava';
import delay from 'delay';
import inRange from 'in-range';
import m from './';

test('then', async t => {
	const timedDelay = m(delay);
	const promise = timedDelay(200);
	await promise;
	t.true(inRange(promise.time, 200, 250));
});

test('catch', async t => {
	const timedDelay = m(delay);
	const promise = timedDelay(200);

	try {
		await promise.then(() => {
			throw new Error();
		});
	} catch (err) {}

	t.true(inRange(promise.time, 200, 250));
});
