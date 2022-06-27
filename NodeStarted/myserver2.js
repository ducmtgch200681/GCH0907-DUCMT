var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res){
    fs.readFile('mydata.txt', function(err,data){
        if(!err){
            res.write(data)
            // res.write('<div><a>Name </a><input type="textbox"></input></div>');
            // res.write('<div><a>Gender </a><input type="radio">Male</input></a><input type="radio">Female</input></div>');
            // res.write('<div><a>Country </a><select><option>VN</option><option>NV</option></select></div>');
            // res.write('<div><button>OK</button></div>');
    
            res.end()
        }
        else{
            res.write("Something wrong!")
            res.end()
        }
        
    })
    // res.write("Gau gau")
})

server.listen(5000)
console.log("Server is running!")