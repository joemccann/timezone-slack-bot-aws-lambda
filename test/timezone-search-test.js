var test = require('tape')
	, tzSearch = require('../src/timezone-search').search
	, lodash = require('lodash')
	, isFunction = lodash.isFunction
	;

test('sanity', t=> {
  t.plan(1)
  t.ok(tzSearch, 'tzSearch exists')
})

test('cannot give search() bad/empty params', t=> {
  t.plan(1)
  try {
    tzSearch()
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }
})

test('can\'t call search() without query', t=> {

  t.plan(1)
  try {
    tzSearch(null, function foo(){console.log('nope')})
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }

})

test('can\'t call search() without callback function', t=> {

  t.plan(1)
  try {
    tzSearch("london", null)
  }
  catch(e) {
    t.ok(e, 'failed with bad params and we got a meaningful error')
    console.log(e)
  }

})


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
