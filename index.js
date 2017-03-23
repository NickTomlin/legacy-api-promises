'use strict'

let wrapPromise = require('wrap-promise')

function wrapClass (target, methods) {
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
  asyncMethod (shouldSucceed) {
    return randoHelper.asyncHelperMethod(shouldSucceed)
  }

  asyncMethodTwo (shouldSucceed) {
    return randoHelper.asyncHelperMethod(shouldSucceed)
  }
}

module.exports = wrapClass(LegacyClass, [
  'asyncMethod',
  'asyncMethodTwo'
])
