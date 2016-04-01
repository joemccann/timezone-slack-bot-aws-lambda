var cheerio = require('cheerio')
  , request = require('request')
  ;

var url = "https://www.google.com/search?site=&source=hp&q={query}"

function parseHtml(query, html, cb){

  var $ = cheerio.load(html)

  var leadNodes = $('._Tsb').html()

/* 
 
 Output should be something like:
 
 <div class="_rkc _Peb">12:30 AM</div>
 <div class="_HOb _Qeb"> Saturday, <span style="white-space:nowrap">April 2, 2016</span> (GMT+11) </div>
 <span class="_HOb _Qeb">   Time in Sydney NSW, Australia </span>

 */

  var finalNodes = cheerio.load(leadNodes)
  
  var output = finalNodes('._rkc').text() + " on" + finalNodes('div._Qeb').text()

  cb && cb(null, output)
}  

// Simple function to output the result on our test
function showResult(err,data){

  if(err) return err
  else console.log(data)

}


var search = exports.search = function(query, cb){

  request(url.replace("{query}", query), function requestCallback(err,response,body){

    if(err) return cb(err)
    else{
      if(response.statusCode <= 399){
        parseHtml(query, body, cb)

      }
      else{
        cb(new Error('response code fail: '+ response.statusCode))
    }

  }
  }) // end request


} // end search


// search('time in sydney', showResult)
