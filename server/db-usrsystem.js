var fs, mongodb, passwordHash, q, raccoon, uuid, mgClient, url, redisPort, redisUrl, randomInt, testViewed;
fs = require('fs');
mongodb = require('mongodb');
passwordHash = require('password-hash');
q = require('q');
raccoon = require('raccoon');
uuid = require('node-uuid');
mgClient = mongodb.MongoClient;
url = 'mongodb://team18:73191020@localhost/team18/';
redisPort = 6379;
redisUrl = '127.0.0.1';
randomInt = function(low, high){
  return Math.floor(Math.random() * (high - low) + low);
};
testViewed = function(usrId, adId){
  return mgClient.connect(url, function(err, db){
    var collection, r;
    collection = db.collection('usrModels');
    r = collection.find({
      $and: [
        {
          _id: usrId
        }, {
          watchAdId: adId
        }
      ]
    });
    return r.toArray(function(e, d){
      var t;
      t = d.length;
      if (t === 0) {
        return 0;
      } else {
        return 1;
      }
    });
  });
};
raccoon.connect(redisPort, redisUrl);
module.exports = {
  inputUsr: function(usr){
    mgClient.connect(url, function(err, db){
      var collection;
      console.log("inputing usr");
      usr._id = uuid.v4();
      usr.postAd = [];
      usr.watchAdId = [];
      collection = db.collection('usrModels');
      return collection.insertOne(usr, {
        w: 1
      }, function(err, result){
        return db.close();
      });
    });
  },
  usrPasswordCheck: function(inputusr, cb){
    console.log("in user password check");
    mgClient.connect(url, function(err, db){
      var collection;
      console.log("checking user:" + inputusr.account + " data");
      collection = db.collection('usrModels');
      if (collection.findOne({
        account: inputusr.account
      } > 0)) {
        collection.findOne({
          account: inputusr.account
        }).then(function(usrDoc){
          var cbObj;
          console.log("data get from database ");
          console.log(usrDoc);
          if (passwordHash.verify(inputusr.pw, usrDoc.pw)) {
            cbObj = {
              success: "pw confirm"
            };
            cbObj._id = usrDoc._id;
            console.log(cbObj);
            cb(cbObj);
          } else {
            cb({
              error: "pw not match"
            });
          }
          db.close();
        });
      } else {
        cb({
          error: "pw not match"
        });
        db.close();
      }
    });
  },
  postAd: function(adInform, cb){
    console.log(adInform);
    return mgClient.connect(url, function(err, db){
      var collection, imagName;
      collection = db.collection('postAdModels');
      imagName = uuid.v4();
      return fs.rename(adInform.path, "public/homepage/postAdImage/" + imagName + ".jpg", function(){
        var i;
        delete adInform.path;
        adInform.period = [];
        if (typeof adInform.start_time === "string" || typeof adInform.end_time === "string") {
          adInform.period.push({
            start: adInform.start_time,
            end: adInform.end_time
          });
        } else {
          for (i in adInform.start_time) {
            adInform.period.push({
              start: adInform.start_time[i],
              end: adInform.end_time[i]
            });
          }
        }
        adInform.imag = imagName;
        adInform._id = uuid.v4();
        adInform.rnd = randomInt(0, 500);
        delete adInform.start_time;
        delete adInform.end_time;
        return collection.insertOne(adInform, {
          w: 1
        }, function(err, result){
          cb(result);
          return db.close();
        });
      });
    });
  },
  getInitialData: function(cb){
    return mgClient.connect(url, function(err, db){
      var collection;
      collection = db.collection('postAdModels');
      return collection.find().limit(6).sort({
        rand: 1
      }).toArray(function(err, doc){
        cb({
          response: doc
        });
        return db.close();
      });
    });
  },
  askForNewAd: function(usrId, AdId, type, cb){
    return mgClient.connect(url, function(err, db){
      var adCollection, usrCollection;
      adCollection = db.collection('postAdModels');
      usrCollection = db.collection('usrModels');
      switch (type) {
      case 'discard':
        if (testViewed(usrId, AdId)) {
          break;
        } else {
          usrCollection.update({
            _id: usrId
          }, {
            $push: {
              watchAdId: AdId
            }
          });
          adCollection.update({
            _id: AdId
          }, {
            $push: {
              discardUser: usrId
            }
          });
          raccoon.disliked(usrId, AdId, function(){
            return console.log("user   " + usrId + "    discard   " + AdId);
          });
          break;
        }
        // fallthrough
      case 'keep':
        if (testViewed(usrId, AdId)) {
          break;
        } else {
          usrCollection.update({
            _id: usrId
          }, {
            $push: {
              watchAdId: AdId
            }
          });
          adCollection.update({
            _id: AdId
          }, {
            $push: {
              keepUser: usrId
            }
          });
          raccoon.liked(usrId, AdId, function(){
            return console.log("user   " + usrId + "    keep    " + AdId);
          });
          break;
        }
        // fallthrough
      }
      return raccoon.recommendFor(usrId, 1, function(r){
        var res;
        console.log("recommend by raccoon");
        if (deepEq$(r, [], '===') || testViewed(usrId, r[0]) || err) {
          console.log("this ad has been read");
          res = adCollection.find({
            rnd: {
              $gte: randomInt(0, 450)
            }
          }).sort({
            rnd: 1
          }).limit(1);
          return res.toArray(function(err, docu){
            if (err) {
              return console.error(err);
            } else {
              console.log(docu[0]);
              cb(docu[0]);
              return db.close();
            }
          });
        } else {
          console.log("in else");
          console.log(r[0]);
          return adCollection.find({
            _id: r[0]
          }).toArray(function(e, d){
            console.log(d);
            return cb(d[0]);
          });
        }
      });
    });
  },
  testDbQuery: function(query, cb){
    return mgClient.connect(url, function(err, db){
      var collection;
      collection = db.collection('postAdModels');
      return collection.find(query).toArray(function(err, doc){
        if (err) {
          console.error(err);
        }
        cb(doc);
        return db.close();
      });
    });
  }
};
function deepEq$(x, y, type){
  var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
      has = function (obj, key) { return hasOwnProperty.call(obj, key); };
  var first = true;
  return eq(x, y, []);
  function eq(a, b, stack) {
    var className, length, size, result, alength, blength, r, key, ref, sizeB;
    if (a == null || b == null) { return a === b; }
    if (a.__placeholder__ || b.__placeholder__) { return true; }
    if (a === b) { return a !== 0 || 1 / a == 1 / b; }
    className = toString.call(a);
    if (toString.call(b) != className) { return false; }
    switch (className) {
      case '[object String]': return a == String(b);
      case '[object Number]':
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        return +a == +b;
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') { return false; }
    length = stack.length;
    while (length--) { if (stack[length] == a) { return true; } }
    stack.push(a);
    size = 0;
    result = true;
    if (className == '[object Array]') {
      alength = a.length;
      blength = b.length;
      if (first) {
        switch (type) {
        case '===': result = alength === blength; break;
        case '<==': result = alength <= blength; break;
        case '<<=': result = alength < blength; break;
        }
        size = alength;
        first = false;
      } else {
        result = alength === blength;
        size = alength;
      }
      if (result) {
        while (size--) {
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
        }
      }
    } else {
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
        return false;
      }
      for (key in a) {
        if (has(a, key)) {
          size++;
          if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
        }
      }
      if (result) {
        sizeB = 0;
        for (key in b) {
          if (has(b, key)) { ++sizeB; }
        }
        if (first) {
          if (type === '<<=') {
            result = size < sizeB;
          } else if (type === '<==') {
            result = size <= sizeB
          } else {
            result = size === sizeB;
          }
        } else {
          first = false;
          result = size === sizeB;
        }
      }
    }
    stack.pop();
    return result;
  }
}