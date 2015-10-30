var querystring, dir, toString$ = {}.toString;
querystring = require('querystring');
fs = require('fs');
function Do(query, outputer){
var param;
param = querystring.parse(query);
switch (param.action) {
	case 'signup':
		console.log("nanoha");
		fs.writeFile(param.account, param.pw, function(err){
			output(JSON.stringify({nanoha: 'nanoha', fate: 'fate', hayate: 'hayate'}));
		})
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
