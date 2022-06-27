const { Console } = require('console')
var http = require('http')

var myserver = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'})

        // res.write('<html><body><p style="color:green">This is home Page.</p></body></html>');

        
        res.write('<div><a>Name </a><input type="textbox"></input></div>');
        res.write('<div><a>Gender </a><input type="radio">Male</input></a><input type="radio">Female</input></div>');
        res.write('<div><a>Country </a><select><option>VN</option><option>NV</option></select></div>');
        res.write('<div><button>OK</button></div>');
    
    res.end()
})

myserver.listen(5000)
