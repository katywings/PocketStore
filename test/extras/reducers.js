/* global describe, it */

var Alo = require('./../../main/alo.full.js')
var alo = new Alo()
var assert = require('assert')

describe('reducers', function () {
  describe('basic', function () {
    it('should replace old state with new state', function () {
      var store = alo.createStore({
        value: false
      })
      store.addReducer(alo.extras.reducers.createUntypedReplace())
      return store.dispatch({ payload: {value: true} }).then(function () {
        assert.equal(true, store.getState().value)
      })
    })
  })
})
