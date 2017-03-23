'use strict'

let MyLegacyApi = require('..')
let assert = require('assert')

describe('An legacy API with bolted on promise support', () => {
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
