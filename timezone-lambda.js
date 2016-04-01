var timezone = require('./timezone-search')

exports.handler = function(event, context){
  var query = "time in " + (event.location || "New York City") // for testing

  timezone.search(query, function tzSearchCb(err,data){
    if(err) return context.fail(err)
    else context.succeed(data)
  })
}
