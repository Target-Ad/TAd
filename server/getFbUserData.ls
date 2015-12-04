q = require \q
https = require \https
qs = require \querystring
module.exports =
	get-fb-usr-data: (code, cb)!->
		accesstoken-url = "https://graph.facebook.com/oauth/access_token?client_id=910359615717780&redirect_uri=http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html&client_secret=47f71eb616fbbc51a09ca8f333758870&code="+code
		https.get accesstoken-url, (res)!->
			res.on \data, (d)->
				access-expire-obj = qs.parse d.toString!
				usr-data-url = "https://graph.facebook.com/me?fields=id,name,email&access_token="+access-expire-obj.access_token
				https.get usr-data-url, (res)!->
					res.on \data, (d)!->
						console.log d.toString!
						cb d.toString!
		.on \error, (err)!->
			console.log e.message
