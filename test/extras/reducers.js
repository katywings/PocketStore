/* global describe, it */

var alo = require('./../../src/main/alo.full.js')
var assert = require('assert')

describe('reducers', function () {
  describe('basic', function () {
    it('should replace old state with new state', function () {
      var store = new alo.Store({
        value: false
      })
      store.addReducer(alo.extras.reducers.basic)
      store.dispatch(function (state) {
        state.value = true
        return state
      })
      assert.equal(true, store.yet().value)
    })
  })
})