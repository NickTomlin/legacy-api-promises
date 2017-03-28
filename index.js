'use strict'

let wrapPromise = require('wrap-promise')

function wrapClass (target) {
  let methods = Object.getOwnPropertyNames(target.prototype).filter((prop) => {
    return prop !== 'constructor';
  });

  methods.forEach((method) => {
    let original = target.prototype[method]
    target.prototype[method] = wrapPromise(original)
  })

  return target
}

let randoHelper = {
  asyncHelperMethod (shouldSucceed) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (shouldSucceed) {
          resolve('Yay')
        } else {
          reject('Nay')
        }
      }, 10)
    })
  }
}

class LegacyClass {
  static staticMethod () {
    return Promise.resolve('foo');
  }

  syncMethod (shouldSuceed) {
    return shouldSuceed;
  }

  asyncMethod (shouldSucceed) {
    return randoHelper.asyncHelperMethod(shouldSucceed)
  }

  asyncMethodTwo (shouldSucceed) {
    return randoHelper.asyncHelperMethod(shouldSucceed)
  }
}

module.exports = wrapClass(LegacyClass)
