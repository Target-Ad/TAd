
require! <[express fs]>
Do = require \./do.js

port = parseInt(fs.readFileSync \port encoding: \utf-8)

express-server = express!
express-server.get \/do (req, res) !-> Do req._parsed-url.query, res
express-server.use express.static \public
express-server.listen port
console.log "Listening on port: #port"