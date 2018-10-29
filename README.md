# called
Simple abstraction for communicating that a specific function has been called.

## Installation

```sh
$ npm install --save @mjstahl/called
```

## Usage

```js
const called = require('@mjstahl/called')
```

`called(<toExecute: Function>) -> <wrapped: Function>`

Take a single Function argument and returns a wrapped Function that is
semantically equivalent and accepts the same number of arguments.

```js
  const add = called(function (x, y) {
    return x + y
  })
  add(2, 3)

  //-> 5
```

`.subscribe(<callback: Function>) -> <unsubscribe: Function>`

Accepts a callback function as an argument and returns an unsubscribe function
used to remove the callback function as a listener.

The callback function should accept two arguments. The 0th argument will be
an instance of Error if an error occurred in the wrapper function. If no error
occurred, the error argument will be null, and the 1st argument will be the
result of the wrapper function's execution.

```js
  const add = called(function (x, y) {
    return x + y
  })
  const unsubscribe = add.subscribe(function (err, result) {
    const output = (err) ? `Uh oh ${err}` : `Hello ${result}`
    console.log(output)
  })
  add(2, 3)

  //-> 5
  //-> Hello 5

  unsubscribe()
  add(2, 3)

  //-> 5
```
