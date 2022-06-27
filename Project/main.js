var express = require('express')
var session = require('express-session')


//Mongo
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://ducmtgch200681:gDo7daGRt7OJjQC2@cluster0.qvorunb.mongodb.net/test'

//alt Mongo
// const { MongoClient } = require('mongodb')

var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'my secrete Makima',
    resave: false
}))



//1.0


//home
app.get('/',isAuthenticated, async (req,res)=>{
    let Notauthen = !req.session.userName
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let products = await dbo.collection('product').find().toArray()
    res.render('home',{'products':products,'Notauthen':Notauthen})
})


//search
app.post('/search',async (req,res)=>{
    let name = req.body.txtName

    let server = await MongoClient.connect(url)

    let dbo = server.db("ATNToys")

    let products = await dbo.collection('product').find({'name': new RegExp(name,'i')}).toArray()
    res.render('home',{'products':products})
})

//create (post)
app.post('/newProduct', async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPicture
    if(name.length <= 5){
        res.render('newProduct', {'nameError':'Ten hong nho hon 5 i tu'})
        return
    }

    let product = {
        'name': name,
        'price': price,
        'picture': picture
    }

    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    await dbo.collection("product").insertOne(product)
    res.redirect('/')
})

//insert get
app.get('/insert',(req,res)=>{
    res.render("newProduct")
})






//logout
app.get('/logout',(req,res)=>{
    req.session.userName = null
    req.session.save((err)=>{
        req.session.regenerate((err2)=>{
            res.redirect('/login')
        })
    })
})

//authen
function isAuthenticated(req,res,next){
    let Notauthen = !req.session.userName
    if(Notauthen)
        res.redirect('/login')
    else
        next()
}

app.post('/account',async (req,res)=>{
    let name = req.body.txtName
    let pass = req.body.txtPass
    req.session.userName = name
    req.session.password = pass
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let result = await dbo.collection("users").find({$and :[{'name':name},{'pass':pass}]}).toArray()
    if(result.length >0){
        res.redirect('/profile')
    }else{
        res.write('khong hop le')
        res.end()
    }    
})

app.get('/profile',isAuthenticated, async (req,res)=>{
    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let user = await dbo.collection("users").find({$and :[{'name':req.session.userName},{'pass':req.session.password}]}).limit(1).toArray()
    res.render('profile',{'name': req.session.userName,'sId':req.session.id,'user':user[0]})
})

app.get('/login',(req,res)=>{
    let Notauthen = !req.session.userName
    res.render('login',{'Notauthen':Notauthen})
})






const PORT = process.env.PORT || 5000
app.listen(PORT )
console.log('Server is running!')

