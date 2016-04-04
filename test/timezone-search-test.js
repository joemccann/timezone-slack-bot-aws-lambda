var test = require('tape')
var tzSearch = require('../src/timezone-search')
var lodash = require('lodash')
var isFunction = lodash.isFunction
var isArray = lodash.isArray

test('sanity', t=> {
  t.plan(1)
  t.ok(tzSearch, 'tzSearch exists')
})

test('cannot give tzSearch bad params', t=> {
  t.plan(1)
  try {
    tzSearch()
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }
})

test('can\'t call tzSearch without query', t=> {

  t.plan(1)
  try {
    tzSearch(null, function foo(){console.log('nope')})
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }

})

/*



  t.plan(1)
  function tester(event, callback) {
    callback(null, event)
  }
  var fn = tzSearch(tester)
  t.ok(isFunction(fn), 'got a function back')

*/


/*

test('should expect "(EDT)" when searching New York City', t=> {
  t.plan(1)
  function tester(event, callback) {
    callback(null, event)
  }
  var fn = lambda(tester)
  t.ok(isFunction(fn), 'got a function back')
})
*/
