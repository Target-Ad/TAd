var mongodb, passwordHash, mgClient, url;
mongodb = require('mongodb');
passwordHash = require('password-hash');
mgClient = mongodb.MongoClient;
url = 'mongodb://team18:73191020@localhost/team18/';
module.exports = {
  inputUsr: function(usr){
    mgClient.connect(url, function(err, db){
      var collection;
      console.log("inputing usr");
      console.log(usr);
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
    });
  }
};