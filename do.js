var querystring, dir, toString$ = {}.toString;
querystring = require('querystring');
fs = require('fs');
session = require('express-session');
pwhash = require('password-hash');
function Do(query, outputer, page){
var param;
param = querystring.parse(query);
//output(JSON.stringify(param));
switch (page) {
	case 'homepage':
		switch(param.action){
		case 'login':
			fs.readFile('./user/'+param.account,'utf8', function(err, data){
				if(err){
					output(JSON.stringify({error:"no account"}));
				}
				else{
					var usr = JSON.parse(data);
					if(pwhash.verify(param.pw,usr.pw)){
						output(JSON.stringify({success : "pw confirm"}));
					}
					else{
						output(JSON.stringify({error: "pw not match"}))
					}
				}
			});
			break;
		case 'register':
			delete param.action;
			delete param.page;
			param.pw = pwhash.generate(param.pw);
			var content = JSON.stringify(param);
			fs.writeFile('./user/'+param.account, content, function(err){
				output(JSON.stringify({error : "write file error"}));
			});
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
