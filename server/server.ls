require! <[express fs multer]>
upload = multer {dest: 'public/homepage/postAdImage/'}
Do = require \./do
port = parseInt(fs.readFileSync \port encoding: \utf-8)
express-server = express!
express-server.disable \etag
express-server.post \/homepage/do, upload.single(\userPhoto), (req, res) -> Do req, res
express-server.get \/do (req, res) !-> Do req._parsed-url.query, res
express-server.get \/login/do (req, res) !-> Do req._parsed-url.query, res, \login
express-server.get \/homepage/do (req, res) !-> Do req._parsed-url.query, res, \register
express-server.use express.static \public
express-server.listen port
console.log "Listening on port: #port"
