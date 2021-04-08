import test from 'ava';
import delay from 'delay';
import inRange from 'in-range';
import hookStd from 'hook-std';
import pTime from './index.js';

test('then', async t => {
	const timedDelay = pTime(delay);
	const promise = timedDelay(200);
	await promise;
	t.true(inRange(promise.time, {start: 180, end: 250}));
});

test('catch', async t => {
	const timedDelay = pTime(delay);
	const promise = timedDelay(200);

	try {
		await promise.then(() => {
			throw new Error('fixture');
		});
	} catch {}

	t.true(inRange(promise.time, {start: 180, end: 250}));
});

test.serial.cb('log', t => {
	const myDelay = ms => new Promise(resolve => {
		setTimeout(resolve, ms);
	});

	hookStd.stdout({silent: true}, (output, unhook) => {
		unhook();
		t.regex(output, /Promise from myDelay resolved in \d+ ms/);
		t.end();
	});

	pTime.log(myDelay)(200);
});

test.serial.cb('log aynonymous function', t => {
	hookStd.stdout({silent: true}, (output, unhook) => {
		unhook();
		t.regex(output, /Promise from \[anonymous] resolved in \d+ ms/);
		t.end();
	});

	pTime.log(delay)(200);
});
