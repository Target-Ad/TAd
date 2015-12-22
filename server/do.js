var querystring, dir, toString$ = {}.toString;
querystring = require('querystring');
fs = require('fs');
usrsys = require('./db-usrsystem.js');
fbdata = require('./getFbUserData.js');
session = require('express-session');
pwhash = require('password-hash');
function Do(query, outputer, page){
if(typeof(query) == 'object'){ // POST
	console.log(query.file);
	console.log(query.body);
	adInform = {owner:query.body.owner, topic: query.body.upload_activity, shop: query.body.upload_shop, place: query.body.upload_location, discription: query.body.discription, start_time: query.body.start_time, end_time: query.body.end_time, type:query.body.type, path: query.file.path};
	usrsys.postAd(adInform,function(result){output(JSON.stringify(result))});
	// query.file => file object
	// query.body => other parameter
    //return output("nanoha");
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
		case 'getFbUsrData':
			console.log("getting user data");
			delete param.action;
			delete param.page;
			fbdata.getFbUsrData(param.code, function(result){output(result)});
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
			usrsys.askForNewAd(param.usr_id, param.Ad_id, param.type,function(result){output(JSON.stringify(result))});
			break;
		case 'getAuthUrl':
			console.log('in getAuthUrl');
			delete param.action;
			delete param.page;
			var credentialUrl;
			connectapi.getAuthUrl(function(returnUrl){output(JSON.stringify(returnUrl))});
			break;
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
// vi:sw=4:ts=4:set nu
