var mongodb, passwordHash, q, mgClient, url;
mongodb = require('mongodb');
passwordHash = require('password-hash');
q = require('q');
mgClient = mongodb.MongoClient;
url = 'mongodb://team18:73191020@localhost/team18/';
module.exports = {
  inputUsr: function(usr){
    mgClient.connect(url, function(err, db){
      var collection;
      console.log("inputing usr");
      usr.postAd = [];
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
          console.log("data get from database ");
          console.log(usrDoc);
          if (passwordHash.verify(inputusr.pw, usrDoc.pw)) {
            cb({
              success: "pw confirm"
            });
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
  postAd: function(inputAd, cb){
    console.log("posting ad");
    return mgClient.connect(url, function(err, db){
      var collection;
      collection = db.collection('postAdModels');
      return collection.insertOne(inputAd, {
        w: 1
      }, function(err, result){
        cb(result);
        return db.close();
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
        console.log(doc);
        cb({
          response: doc
        });
        return db.close();
      });
    });
  },
  askForNewAd: function(cb){
    return mgClient.connect(url, function(err, db){
      var collection;
      collection = db.collection('postAdModels');
      return collection.findOne().then(function(doc){
        console.log("find in database");
        cb(doc);
        return db.close();
      });
    });
  }
};