var querystring, dir, toString$ = {}.toString;
querystring = require('querystring');
fs = require('fs');
function Do(query, outputer, page){
var param;
param = querystring.parse(query);
switch (param.page) {
	case 'test':
		delete param.action;
		var content = JSON.stringify(param)
		fs.writeFile('./user/'+param.account, content, function(err){
			output(JSON.stringify({nanoha: 'nanoha', fate: 'fate', hayate: 'hayate'}));
		})
		break;
	case 'homepage':
		switch(param.action){
		case 'login':
			fs.readFile('./user/'+param.account,'utf8', function(err, data){
				if(err){
					output(JSON.stringify({nanoha: 'nanoha', fate: 'fate', hayate: 'hayate'}));
					
				}
			})
			break;
		default:
			output(JSON.stringify({stage:'default'}));
			break;
		}
		break;
}
function ERR(it){
  if (it.stack) {
	console.log(it.stack);
	output({
	  err: it.message
	});
  } else {
	output(it);
  }
  return false;
}
function output(it){
	outputer.send(it);
}
process.on('uncaughtException', function(it){ ERR(it); });
}
module.exports = Do;
// vi:sw=4:ts=4
