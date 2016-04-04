var timezone = require('./src/timezone-search')

exports.handler = function(event, context){
  var query = "time in " + event.text

  timezone.search(query, function tzSearchCb(err,data){
    if(err) return context.fail(err)
    else context.succeed({"text": data})
  })
}
