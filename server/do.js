var querystring, dir, toString$ = {}.toString;
querystring = require('querystring');
fs = require('fs');
usrsys = require('./db-usrsystem.js');
connectapi = require('./googlecalender.js')
session = require('express-session');
pwhash = require('password-hash');
function Do(query, outputer, page){
if(typeof(query) == 'object'){ // POST
	// query.file => file object
	// query.body => other parameter
    return output("nanoha");
}
var param;
param = querystring.parse(query);
//output(JSON.stringify(param));
console.log(param);
switch (param.page) {
	case 'homepage':
		switch(param.action){
		case 'login':
			console.log("login func");	
			delete param.action;
			delete param.page;
			usrsys.usrPasswordCheck(param, function(result){output(JSON.stringify(result))});
			break;
		case 'register':
			delete param.action;
			delete param.page;
			param.pw = pwhash.generate(param.pw);
			usrsys.inputUsr({account: param.account, pw:param.pw, postAd: param.postAd});
			break;
		case 'getAuthUrl':
			console.log('in getAuthUrl');
			delete param.action;
			delete param.page;
			var credentialUrl;
			connectapi.getAuthUrl(function(returnUrl){output(JSON.stringify(returnUrl))});
			break;
		case 'getUsrData':
			delete param.action;
			delete param.page;
			connectapi.getUsrData(param.code, function(result){output(JSON.stringify(result))});
			break;
		case 'getInitialData':
			delete param.action;
			delete param.page;
			console.log("in get initial data");
			usrsys.getInitialData(function(result){output(JSON.stringify(result))});
			break;
		case 'askForNewAd':
			delete param.acton;
			delete param.page;
			console.log("ask for new ad");
			usrsys.askForNewAd(function(result){output(JSON.stringify(result))});
			break;
		default:
			output(JSON.stringify({stage:'123default'}));
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
// vi:sw=4:ts=4:set nu
