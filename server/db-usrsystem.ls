require! <[fs mongodb password-hash q raccoon]>
uuid = require \node-uuid
mg-client = mongodb.MongoClient
url = \mongodb://team18:73191020@localhost/team18/
redis-port = 6379
redis-url = \127.0.0.1
random-int = (low, high)->
	Math.floor Math.random!*(high - low)+low
test-viewed = (usr-id, ad-id)->
	mg-client.connect url, (err, db)->
		collection = db.collection \usrModels
		r = collection.find {$and: [{_id: usr-id},{watch-ad-id: ad-id}]}
		r.toArray (e, d)->
			t = d.length
			if t ==0
				return 0
			else
				return 1
raccoon.connect redis-port,redis-url
module.exports =
	input-usr: (usr)!->
		mg-client.connect url, (err, db)->
			console.log "inputing usr"
			usr <<< {_id:uuid.v4!, post-ad:[], watch-ad-id: [], keep-ad-id:[]}
			collection = db.collection \usrModels
			collection.insertOne usr, {w:1}, (err, result)->
				db.close!
	usr-password-check: (inputusr, cb)!->
		console.log "in user password check"
		mg-client.connect url, (err, db)!->
			console.log "checking user:#{inputusr.account} data"
			collection = db.collection \usrModels
			if collection.findOne {account: inputusr.account}>0
				##### make sure same user doesn't exist #####  
				collection.findOne {account: inputusr.account} .then (usr-doc)!->
					console.log "data get from database "
					console.log usr-doc
					if password-hash.verify inputusr.pw, usr-doc.pw
						cb-obj = {success : "pw confirm"}
						cb-obj <<< {_id:usr-doc._id}
						console.log cb-obj
						cb cb-obj
					else
						cb {error: "pw not match"}
					db.close!
			else
				cb {error: "pw not match"}
				db.close!
	init-post-ad: (ad-inform, cb)->
		console.log ad-inform
		mg-client.connect url, (err, db)->
			collection = db.collection \postAdModels
			imag-name = uuid.v4!
			collection.insertOne ad-inform, {w:1}, (err, result)->
				cb result
				db.close!
	post-ad: (ad-inform, cb)->
		console.log "ad-inform = "
		console.log ad-inform
		mg-client.connect url, (err, db)->
			ad-collection = db.collection \postAdModels
			usr-collection = db.collection \usrModels
			imag-name = uuid.v4!
			ad-id = uuid.v4!
			usr-collection.update {account:ad-inform.owner}, {$push: {post-ad: ad-id}}
			fs.rename ad-inform.path, "public/homepage/postAdImage/"+imag-name+".jpg", ->
				delete ad-inform.path
				ad-inform.period = []
				if typeof ad-inform.start_time == "string" or typeof ad-inform.end_time == "string"
					ad-inform.period.push {start: ad-inform.start_time, end: ad-inform.end_time}
				else
					for i of ad-inform.start_time
						ad-inform.period.push {start: ad-inform.start_time[i], end: ad-inform.end_time[i]}
				ad-inform <<< {imag: imag-name, _id:ad-id, owner:ad-inform.owner, rnd: random-int(0, 500)}
				delete ad-inform.start_time
				delete ad-inform.end_time
				ad-collection.insertOne ad-inform, {w:1}, (err, result)->
					cb result
					db.close!
	get-initial-data: (cb)->
		mg-client.connect url, (err, db)->
			collection = db.collection \postAdModels
			collection.find!.limit(6).sort({rand:1}).toArray (err, doc)->
				cb {response:doc}
				db.close!
	ask-for-new-ad: (usr-id, Ad-id, type, cb)->
		mg-client.connect url, (err, db)->
			ad-collection = db.collection \postAdModels
			usr-collection = db.collection \usrModels
			switch type
			| \discard =>
				if test-viewed(usr-id, Ad-id)
					break
				else
					usr-collection.update {_id:usr-id}, {$push: {watch-ad-id: Ad-id}}
					ad-collection.update {_id:Ad-id}, {$push: {discard-user: usr-id}}
					raccoon.disliked usr-id, Ad-id, ->
						console.log "user   "+usr-id+"    discard   "+Ad-id
					break;
				fallthrough
			| \keep =>
				if test-viewed(usr-id, Ad-id)
					break
				else
					usr-collection.update {_id:usr-id}, {$push: {watch-ad-id: Ad-id}}
					usr-collection.update {_id:usr-id}, {$push: {keep-ad-id: Ad-id}}
					ad-collection.update {_id:Ad-id}, {$push: {keep-user: usr-id}}
					raccoon.liked usr-id, Ad-id, ->
						console.log "user   "+usr-id+"    keep    "+Ad-id
					break
				fallthrough
			raccoon.recommendFor usr-id, 1, (r)->
				console.log "recommend by raccoon"
				if r === [] or test-viewed(usr-id, r[0]) or err
					console.log "this ad has been read" 
					res =ad-collection.find {rnd:{$gte: random-int 0 450}} .sort {rnd:1} .limit 1
					res.toArray (err, docu)->
						if err
							console.error err
						else
							console.log docu[0]
							cb docu[0]
							db.close!
				else
					console.log "in else"
					console.log r[0]
					ad-collection.find {_id: r[0]} .toArray (e, d)->
						console.log d
						cb d[0]
	test-db-query: (query, cb)->
		mg-client.connect url, (err, db)->
			collection = db.collection \postAdModels
			collection.find query .toArray (err, doc)->
				if err
					console.error err
				cb doc
				db.close!
	survey-input: (_id, score, cb)!->
		console.log "survey button"
		mg-client.connect url, (err, db)!->
			collection_survey = db.collection \survey
			##### find the userID in the db #####
			collection_survey.find( { usr-id: _id } ) .toArray (err, doc)!->
				console.log doc
				if doc === []
					survey-res = {usr-id: _id, score: [score]}
					console.log survey-res
					collection_survey.insertOne survey-res, {w:1}, (err, result)->
					db.close!
				else
					collection_survey.update {usr-id:_id}, {$push: {score: score}}
	ask-for-usr-inform: (usr-id, cb)->
		mg-client.connect url, (err, db)!->
			ad-collection = db.collection \postAdModels
			usr-collection = db.collection \usrModels
			usr-inform = {}
			usr-collection.findOne {_id: usr-id} .then (usr-doc)!->
				console.log usr-doc
				ad-collection.find {_id: { $in: usr-doc.post-ad}} .toArray (err, post-ad-doc)->
					usr-inform.post-ad = post-ad-doc
					ad-collection.find {_id: { $in: usr-doc.keep-ad-id}} .toArray (err, keep-ad-doc)->
						usr-inform.keep-ad = keep-ad-doc
						cb usr-inform
