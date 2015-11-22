require! <[mongodb password-hash]>
mg-client = mongodb.MongoClient
url = \mongodb://team18:73191020@localhost/team18/
module.exports =
	input-usr: (usr)!->
		mg-client.connect url, (err, db)->
			console.log "inputing usr"
			console.log usr
			collection = db.collection \usrModels
			collection.insertOne usr, {w:1}, (err, result)->
				db.close!
	usr-password-check: (inputusr, cb)!->
		console.log "in user password check"
		mg-client.connect url, (err, db)!->
			console.log "checking user:#{inputusr.account} data"
			collection = db.collection \usrModels
			if collection.findOne {account: inputusr.account}>0
				collection.findOne {account: inputusr.account} .then (usr-doc)!->
					console.log "data get from database "
					console.log usr-doc
					if password-hash.verify inputusr.pw, usr-doc.pw
						cb {success : "pw confirm"}
					else
						cb {error: "pw not match"}
					db.close!
			else
				cb {error: "pw not match"}
				db.close!


