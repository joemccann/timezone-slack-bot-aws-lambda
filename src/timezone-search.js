var cheerio = require('cheerio')
  , request = require('request')
  , _ = require('lodash')
  , url = "https://www.google.com/search?site=&source=hp&q={query}"
  ;

// The function that parses the google.com 
// search results page.
// @param html is required
// @param cb is required
function parseHtml(html, cb){

  // nah dawg you need a html parameter
  if (!html) {
    throw Error('parseHtml requires a query.')
  }

  // nah dawg, for real you need a html string
  if ( !_.isString(html) ) {
    throw Error('parseHtml requires query parameter to be a string')
  }

  // nah dawg you need a callback
  if (!cb) {
    throw Error('parseHtml requires a callback function.')
  }

  // nah dawg, for real you need a callback
  if ( !_.isFunction(cb) ) {
    throw Error('parseHtml requires cb parameter to be a function')
  }

  // Okay cool
  var $ = cheerio.load(html)
    , leadNodes = $('._Tsb').html()
    , finalNodes = cheerio.load(leadNodes)
    , output = finalNodes('._rkc').text() + " on" + finalNodes('div._Qeb').text()
    ;
 
  /* 
   
   Output should be something like:
   
   <div class="_rkc _Peb">12:30 AM</div>
   <div class="_HOb _Qeb"> Saturday, <span style="white-space:nowrap">
   April 2, 2016</span> (GMT+11) </div>
   <span class="_HOb _Qeb">   Time in Sydney NSW, Australia </span>

   */

  return cb(null, output)
}  

// The timezone search function
// @param query is required
// @param cb is required
exports.search = function(query, cb){

  // nah dawg you need a query
  if (!query) {
    throw Error('search requires a query.')
  }

  // nah dawg, for real you need a query
  if ( !_.isString(query) ) {
    throw Error('search requires query parameter to be a string')
  }

  // nah dawg you need a callback
  if (!cb) {
    throw Error('search requires a callback function.')
  }

  // nah dawg, for real you need a callback
  if ( _.isFunction(cb) ) {
    throw Error('search requires cb paramenter to be a function')
  }

  // Initiate request to google.com
  request(url.replace("{query}", query), function requestCallback(err,response,body){

    if(err) return cb(err)
    if(response.statusCode <= 399){ parseHtml(body, cb) }
    else{ cb(new Error('response code fail: '+ response.statusCode)) }
    
  })  // end request

} // end search