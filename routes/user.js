const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
require('dotenv/config')
router.use(bodyParser.urlencoded({extended:true}));
router.use(express.json())
router.use(express.urlencoded({ extended : true }))




router.get('/auth', (req, res)=> {
    let emails = []

    

    res.render('login',{"emails":emails});
  });

router.get('/', (req, res)=> {
    let emails = []

    for (let index = 0; index < users.length; index++) {
        emails[index]=users[index].email
        
    }

    res.render('users',{"emails":emails});
  });


const jwt = require('jsonwebtoken')



const secret = process.env.SECRET_KEY




const users = [{ 
    "email":"aymen@gmail.com",
    "password":"password"}]

router.post('/register',(req,res)=>{

    
    let user = {
        "email" : req.body.email,
        "password" : bcrypt.hashSync (req.body.password,10),
    }

    users.push(user)
    
    
    res.sendStatus(201)
})

router.post('/login', (req,res)=>{
    
    let userlogin = {
        "email" : req.body.email,
        "password" :req.body.pass
    }
    console.log(req.body)
    
    const utilisateur = users.find( user => userlogin.email==user.email)
    if (utilisateur == null) {
        res.send("pas de user")
    }
    else {
        if (bcrypt.compareSync(userlogin.password,utilisateur.password)) {

            const token = jwt.sign({
                email : userlogin.email
            },secret,{ expiresIn: 60 * 60 })
            res.status(200).send({
                message:'User Authenticated',
                token:token
        })
           
        }else res.send(401)
    }
    
    
})

router.post('/loginJWT', (req,res)=>{
    
    let token = {
        "jwt" : req.body.jwt,
        
    }
    
    jwt.verify(token.jwt, secret, function(err, decoded) {
        if (decoded) {
            res.send(200)
        }
        else {
            res.send(401)
        }
      });
    
    
})






router.get('/', (req,res)=>{

      

    res.send(users)
})

module.exports = router