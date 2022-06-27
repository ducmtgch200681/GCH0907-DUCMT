var express = require('express')
var fs = require('fs')
var app = express()

app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')
app.use(express.static('public'))

app.get('/',function(req,res){
    let productList = []
    fs.readFile("data.txt","utf-8",function(err,data){
        let data2 = data.trim().split('\n')
        for(i=0;i<data2.length;i++){
            let s = data2[i].split(";") // s[0]: ten s[1]:img
            let productElement = {
                name: s[0],
                img:s[1]
            }
            productList.push(productElement)
        }
        res.render('index',{'productList':productList})
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running!")