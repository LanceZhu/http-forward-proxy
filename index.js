var http = require('http')
var httpProxy = require('http-proxy');  
 
// new proxy server
var proxy = httpProxy.createProxyServer({});  
 
// catch error
proxy.on('error', function (err, req, res) {  
  res.writeHead(500, {  
    'Content-Type': 'text/plain'  
  });  
  res.end('Something went wrong. And we are reporting a custom error message.');  
});  

proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Accept-Encoding', 'none');
});

// create server
var server = http.createServer(function(req, res) {  
  var host = req.headers.host
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  proxy.web(req, res, { target: "http://" + host });
});  
 
console.log("listening on port 5050")
server.listen(5050); 