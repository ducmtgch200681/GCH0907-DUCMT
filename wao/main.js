var express = require('express')
var app = express()

app.set('view engine','hbs')

app.get('/',function(req,res){
    let n = new Date()
    let name = "Captain Jack"
    res.render('home',{'now':n,'name':name})
})

app.post('/registerLunch',function(req,res){
    let name = req.body.txtName
    let food = req.body.food
})

app.get('/student',function(req,res){
    let foods = ['com','ga','bo','my tom']
    let food2 = []
    for(i=0;i<foods.length;i++){
        food2.push(foods[i].toUpperCase())
    }
    res.render('student Page',{'foods':food2})
})

app.listen(5000)
console.log('server is running')