import { MaybePromise } from '../src/MaybePromise';
import { expect } from 'chai';

describe('MaybePromise', () => {
    it('should be able to chain', async () => {
        let syncOp = (n: number) => n * 2;
        let promiseOp = (n: number) => new Promise<number>(resolve => setTimeout(() => resolve(n * 3), n));

        let result: any;

        //sync state, sync operation
        result = new MaybePromise(5).chain(syncOp).value();
        expect(result).equals(10);

        //sync state, async operation
        result = new MaybePromise(7).chain(promiseOp).value();
        await expectPromise(result, 21);

        //async state, sync operation
        result = new MaybePromise(promiseOp(11)).chain(syncOp).value();
        await expectPromise(result, 66);

        //async state, async operation
        result = new MaybePromise(promiseOp(13)).chain(promiseOp).value();
        await expectPromise(result, 117);
    });
});

async function expectPromise(promise: Promise<any>, expected: any) {
    expect(typeof promise.then).equals('function');
    let result = await promise;
    expect(result).equals(expected);
}