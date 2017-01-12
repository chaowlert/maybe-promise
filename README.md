# maybe-promise
Handling promise or non-promise in one operation

## Install

```
npm install maybe-promise --save
```

## Usage

If you would like to output promise or non-promise based on input, for example, you might have library called `AwesomeStorage`. 
And `AwesomeStorage` has 2 implementations.

If user uses `localStorage`, `AwesomeStorage.get` will return non-promise.

If user uses `indexedDB`, `AwesomeStorage.get` will return promise.

In this case, your `AwesomeStorage` based class can be following:

```
get(name: string) {
    return new MaybePromise(name).chain(this.getImpl).value();
}

abstract getImpl(name: string): any;
```

And `getImpl` will be implementation which return promise or non-promise based on storage type.