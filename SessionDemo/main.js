var express = require('express')
const session = require('express-session')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'my secret dukemt',
    resave: false
}))


//let server = await MongoClient.connect(url)
// let dbo = server.db("ATNToys")
//let products = await dbo.collection('product').find({'name': new RegExp(name,'i')}).toArray()


app.post('/register',async (req,res)=>{
    let name = req.body.txtName
    req.session.userName = name
    
    // let chuaDangNhap = !req.session.userName
    // let daDangNhap = req.session.userName

    let server = await MongoClient.connect(url)
    let dbo = server.db("ATNToys")
    let daDangNhap = await dbo.collection("users").find({$and :[{'name':name}]}).toArray()
    if(daDangNhap.length > 0){
        res.render('profile',{'name': req.session.userName,
                // 'chuaDangNhap': chuaDangNhap, 
                'daDangNhap': daDangNhap,
                
            })
    } else {
        res.write('khong hop le')
        res.end()
    }

    
})

app.get('/profile',(req,res)=>{
    let chuaDangNhap = !req.session.userName
    // let daDangNhap = req.session.userName

    res.render('profile',{'name':req.session.userName, 'chuaDangNhap': chuaDangNhap, 
                    // 'daDangNhap': daDangNhap
                })
})

app.get('/',(req,res)=>{
    let accessCount = req.session.accessCount || 0
    accessCount++
    req.session.accessCount = accessCount

    let chuaDangNhap = !req.session.userName
    // let daDangNhap = req.session.userName

    // let server = await MongoClient.connect(url)
    // let dbo = server.db("ATNToys")
    // let taikhoan = await dbo.collection('users').find({$and: [{name:'Vinh', name: 'Linh'}, {name: {$exists:true}}]})

    res.render('home',{'accessCount': accessCount, 'chuaDangNhap': chuaDangNhap 
                // 'daDangNhap': daDangNhap, 
                // 'taikhoan': taikhoan
            })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')