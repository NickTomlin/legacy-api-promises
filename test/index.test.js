'use strict'

let MyLegacyApi = require('..')
let assert = require('assert')

describe('An legacy API with bolted on promise support', () => {
  it('ignores static methods', () => {
    var promise = MyLegacyApi.staticMethod(() => {});

    // static methods are ignored, so it should
    // should be undefined if a callback was passed
    // we confirm that it does not work with static
    // methods by checking that it's a promise
    assert.ok(promise instanceof Promise);
  });

  context('callbacks', () => {
    it('happy path', (done) => {
      let api = new MyLegacyApi

      api.asyncMethod(true, (err, result) => {
        assert.equal(result, 'Yay')
        done()
      })
    })

    it('sad path', (done) => {
      let api = new MyLegacyApi

      api.asyncMethod(false, (err, result) => {
        assert.equal(err, 'Nay')
        done()
      })
    })
  })

  context('promises', () => {
    it('happy path', () => {
      let api = new MyLegacyApi

      return api
        .asyncMethodTwo(true)
        .then((result) => {
          assert.equal(result, 'Yay')
        })
    })

    it('sad path', () => {
      let api = new MyLegacyApi

      return api
        .asyncMethodTwo(false)
        .then((result) => {
          throw new Error('We shouldn\'t be here')
        })
        .catch((err) => {
          assert.equal(err, 'Nay')
        })
    })
  })
})
