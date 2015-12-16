google = require \googleapis
q = require \q
oauth = google.auth.OAuth2
client-id = \653283254318-psv6ml7gpu3urhjspfr68d56gc2orruc.apps.googleusercontent.com
client-secret = \krjvcx3yQ3os0ECtpSqgUpiZ
redir-url = "http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html"
plus = google.plus \v1
oauth2client = new oauth client-id, client-secret, redir-url
scopes = [\https://www.googleapis.com/auth/plus.me \https://www.googleapis.com/auth/calendar]
sav-tokens = {}
module.exports = 
	get-auth-url: (cb)->
		url = oauth2client.generateAuthUrl {access_type: \offline scope:scopes}
		console.log "return-url = "+url
		cb url
	get-usr-data: (code, cb)->
		oauth2client.getToken code, (err, tokens)->
			if!err
				sav-tokens := tokens
				oauth2client.setCredentials(tokens)
				plus.people.get {user-id: \me, auth: oauth2client}, (err, res)->
					cb {name: res.displayName}
					console.log res
