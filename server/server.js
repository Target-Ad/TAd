var express, fs, multer, upload, Do, port, expressServer;
express = require('express');
fs = require('fs');
multer = require('multer');
upload = multer({
  dest: 'public/homepage/postAdImage/'
});
Do = require('./do.js');
port = parseInt(fs.readFileSync('port', {
  encoding: 'utf-8'
}));
expressServer = express();
expressServer.disable('etag');
expressServer.post('/homepage/do', upload.single('userPhoto'), function(req, res){
  return Do(req, res);
});
expressServer.get('/do', function(req, res){
  Do(req._parsedUrl.query, res);
});
expressServer.get('/login/do', function(req, res){
  Do(req._parsedUrl.query, res, 'login');
});
expressServer.get('/homepage/do', function(req, res){
  Do(req._parsedUrl.query, res, 'register');
});
expressServer.use(express['static']('public'));
expressServer.listen(port);
console.log("Listening on port: " + port);