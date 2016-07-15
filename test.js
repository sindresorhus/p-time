import test from 'ava';
import delay from 'delay';
import inRange from 'in-range';
import hookStd from 'hook-std';
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

test.cb.serial('log', t => {
	const myDelay = ms => new Promise(resolve => {
		setTimeout(resolve, ms);
	});

	const unhook = hookStd.stdout({silent: true}, output => {
		unhook();
		t.regex(output, /Promise from myDelay resolved in \d+ ms/);
		t.end();
	});

	m.log(myDelay)(200);
});

test.cb.serial('log aynonymous function', t => {
	const unhook = hookStd.stdout({silent: true}, output => {
		unhook();
		t.regex(output, /Promise from \[anonymous\] resolved in \d+ ms/);
		t.end();
	});

	m.log(delay)(200);
});
