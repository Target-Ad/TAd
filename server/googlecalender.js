var google, q, oauth, clientId, clientSecret, redirUrl, plus, oauth2client, scopes, savTokens;
google = require('googleapis');
q = require('q');
oauth = google.auth.OAuth2;
clientId = '653283254318-psv6ml7gpu3urhjspfr68d56gc2orruc.apps.googleusercontent.com';
clientSecret = 'krjvcx3yQ3os0ECtpSqgUpiZ';
redirUrl = "http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html";
plus = google.plus('v1');
oauth2client = new oauth(clientId, clientSecret, redirUrl);
scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar'];
savTokens = {};
module.exports = {
  getAuthUrl: function(cb){
    var url;
    url = oauth2client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes
    });
    console.log("return-url = " + url);
    return cb(url);
  },
  getUsrData: function(code, cb){
    return oauth2client.getToken(code, function(err, tokens){
      if (!err) {
        savTokens = tokens;
        oauth2client.setCredentials(tokens);
        return plus.people.get({
          userId: 'me',
          auth: oauth2client
        }, function(err, res){
          cb({
            name: res.displayName
          });
          return console.log(res);
        });
      }
    });
  }
};