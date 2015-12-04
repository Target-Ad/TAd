var q, https, qs;
q = require('q');
https = require('https');
qs = require('querystring');
module.exports = {
  getFbUsrData: function(code, cb){
    var accesstokenUrl;
    accesstokenUrl = "https://graph.facebook.com/oauth/access_token?client_id=910359615717780&redirect_uri=http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html&client_secret=47f71eb616fbbc51a09ca8f333758870&code=" + code;
    https.get(accesstokenUrl, function(res){
      res.on('data', function(d){
        var accessExpireObj, usrDataUrl;
        accessExpireObj = qs.parse(d.toString());
        usrDataUrl = "https://graph.facebook.com/me?fields=id,name,email&access_token=" + accessExpireObj.access_token;
        return https.get(usrDataUrl, function(res){
          res.on('data', function(d){
            console.log(d.toString());
            cb(d.toString());
          });
        });
      });
    }).on('error', function(err){
      console.log(e.message);
    });
  }
};