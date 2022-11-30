const express = require('express')
const app = express()

const userRoute = require('./routes/user')

app.set('view engine','ejs')
app.use(express.urlencoded({ extended : true }))


app.use(express.json())

app.use('/user',userRoute)

// app.use(express.static("pages"))
// app.use(express.urlencoded({ extended : true }))

app.get('/testLogin', (req, res)=> {
    res.render('login',{"val":"test"});
  });

app.post('/test',(req,res)=>{
    console.log(req.body +":"+ req.query.attr );
    res.send('test')
})






app.post('/:number',(req,res)=>{
    res.send("Bonjour "+req.params.number)
})





app.listen(3000,()=>{
    console.log("Server running on port 3000");
})


