const express = require("express");
const User =require ("./models/User.js")
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cookieParser = require("cookie-parser")
const translate = require('@vitalets/google-translate-api');



const secret = process.env.SECRET;


const connectDB = require('./models/db')
// const mongoSessions = process.env.SESSION
// connectDB(mongoSessions);
const mongo = process.env.MONGODBURI
connectDB(mongo);

const app = express()
app.use(express.json({limit: "30mb", extended:true}))
app.use (express.urlencoded ({limit: "30mb", extended: true}))
app.use(cookieParser())





const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.use(cors({ 
    credentials:true,
    origin:"http://localhost:3000",
}))

const TodoModel = require('./models/Todo');
const todoseed = require('./models/todoseed');
const BlogModel = require('./models/Blog');
const blogseed = require('./models/blogseed')
const TranslatorModel = require('./models/Translator')
const translatorseed = require('./models/translatorseed')
const ScoreModel = require('./models/Score');
const scoreseed = require('./models/scoreseed')


//verify cookie data with token data, to stay logged in
app.get('/user', (req,res)=>{
    const payload = jwt.verify(req.cookies.token,secret)
    User.findById(payload.id)
        .then(userInfo =>{
            res.json({id:userInfo._id,username:userInfo.username,email:userInfo.email})
        })
})

//sign up, jwt sign, pass payload (userinfo), with secret key, send a token inside the cookie
app.post('/register',async (req,res)=>{
    const {username, email,password} = req.body;
    if (!username || !email || !password)
        return res.json({ errorMessage: "Please enter all required fields." });

    const hashedPassword = bcrypt.hashSync(password, 10)
    try{
        const user = await new User({username,password:hashedPassword,email})
        await user.save().then(userInfo =>{
            jwt.sign({id:userInfo._id,username:userInfo.username,email:userInfo.email},secret, (err,token)=>{
                if (err){
                    console.log(err);
                } else {
                    res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
                }
            })
            
    })
    } catch (err) {
        console.log("blaaas",err);
        return res.json({ errorMessage: "Existing user." });
    }
    
})

//login
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    console.log("hohoa")
    await User.findOne({email})
    .then(userInfo=>{
        try{
            console.log('hohoa2')
            console.log('password',password)
            console.log('userinfopassword',userInfo.password)
            const passOk = bcrypt.compareSync(password,userInfo.password);
            console.log('hohoa3')    
            if ( email && passOk){
                jwt.sign({
                id:userInfo._id, 
                email},
                secret,
                (err,token)=>{
                if (err){
                    console.log(err);
                    res.send("Invalid Input")
                    return next(err);
                } else {
                    res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
                }
                })
            } else {
                res.send("issue")
            }
        } catch(err){
            console.log('caught error',err)
            res.send("err")
        }
    
    })
})

//logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').send()
})


// todo
app.get("/todo/:email", async (req, res) => {
    try {
        const data = await TodoModel.find({email: req.params.email}); 
        res.send(data);
        console.log({status: 'ok', msg: 'get'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//blog
app.get("/blog/:email", async (req, res) => {
    try {
        const data = await BlogModel.find({email: req.params.email}); 
        res.send(data);
        console.log({status: 'ok', msg: 'get'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//translator
app.get("/translator/:email", async (req, res) => {
    try {
        const data = await TranslatorModel.find({email: req.params.email}); 
        res.send(data);
        console.log({status: 'ok', msg: 'get'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//score
app.get("/score/:email", async (req, res) => {
    try {
        const data = await ScoreModel.find({email: req.params.email}); 
        res.send(data);
        console.log({status: 'ok', msg: 'get'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// todo seed
app.get("/todoseed", async (req, res) => {
    try {
        await TodoModel.deleteMany({});
        const data = await TodoModel.create(todoseed); 
        res.send(data);
        console.log({status: 'ok', msg: 'seeded'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//translator seed
app.get("/translatorseed", async (req, res) => {
    try {
        await TranslatorModel.deleteMany({});
        const data = await TranslatorModel.create(translatorseed); 
        res.send(data);
        console.log({status: 'ok', msg: 'seeded'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//score seed
app.get("/scoreseed", async (req, res) => {
    try {
        await ScoreModel.deleteMany({});
        const data = await ScoreModel.create(scoreseed); 
        res.send(data);
        console.log({status: 'ok', msg: 'seeded'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

//blog seed
app.get("/blogseed", async (req, res) => {
    try {
        await BlogModel.deleteMany({});
        const data = await BlogModel.create(blogseed); 
        res.send(data);
        console.log({status: 'ok', msg: 'seeded'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

////////////////////////////////////////////////////////////////////////////////////////

// todo
app.get('/todo/show/:id', async (req, res) => {
    console.log('getting one')
    try {
        const data = await TodoModel.findOne({_id: req.params.id});
        res.send(data);
        console.log({status: 'ok', msg: 'get one'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// todo
app.post("/todo/add", async (req, res) => {
    try {
        const data = await TodoModel.create(req.body); 
        res.send({status: 'ok', msg: 'added'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// todo
app.put("/todo/edit/:id", async (req, res) => {
    try {
        await TodoModel.updateOne({_id: req.params.id}, req.body); 
        const data = await TodoModel.findOne({_id: req.params.id}); 
        res.send(data);
        console.log({status: 'ok', msg: 'editted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// todo
app.delete("/todo/delete/:id", async (req, res) => {
    try {
        await TodoModel.deleteOne({_id: req.params.id}); 
        const data = await TodoModel.find({}); 
        res.send(data);
        console.log({status: 'ok', msg: 'deleted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})


// blog
app.get('/blog/show/:id', async (req, res) => {
    console.log('getting one')
    try {
        const data = await TodoModel.findOne({_id: req.params.id});
        res.send(data);
        console.log({status: 'ok', msg: 'get one'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// blog
app.post("/blog/add", async (req, res) => {
    try {
        const data = await BlogModel.create(req.body); 
        res.send({status: 'ok', msg: 'added'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// blog
app.put("/blog/edit/:id", async (req, res) => {
    try {
        await BlogModel.updateOne({_id: req.params.id}, req.body); 
        const data = await BlogModel.findOne({_id: req.params.id}); 
        res.send(data);
        console.log({status: 'ok', msg: 'editted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// blog
app.delete("/blog/delete/:id", async (req, res) => {
    try {
        await BlogModel.deleteOne({_id: req.params.id}); 
        const data = await BlogModel.find({}); 
        res.send(data);
        console.log({status: 'ok', msg: 'deleted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// translator
app.post("/translator/translate", async (req, res) => {
    try {
        const data = await TranslatorModel.create(req.body); 
        res.send({status: 'ok', msg: 'added'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// // translator
// app.get('translator/show/:id', async (req, res) => {
//     console.log('getting one')
//     try {
//         const data = await TodoModel.findOne({_id: req.params.id});
//         res.send(data);
//         console.log({status: 'ok', msg: 'get one'});
//     } catch (error) {
//         console.log({status: 'bad', msg: error.message});
//     }
// })

app.get('/speechtranslator', async (req,res) => {
    try {
        const data = await TranslatorModel.findOne({_id: req.params.id});
        res.send(data);
        console.log({status: 'ok', msg: 'get one'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
  })
  
  
app.post('/speechtranslator',(req,res) => {
    console.log(req.body.speech)
    translate(req.body.speech, {to: req.body.language}).then(response => {
    res.render('speechtranslator.ejs',{title:"Text Translator",translated:response.text})
  }).catch(err => {
      console.error(err);
  });
  
  })

// app.get('/speechtranslator',(req,res) => {
//   res.render('speechtranslator.ejs',{title:"Text Translator",translated:""})
// })


// app.post('/speechtranslator',(req,res) => {

//   console.log(req.body.speech)

//   translate(req.body.speech, {to: req.body.language}).then(response => {
//     res.render('speechtranslator.ejs',{title:"Text Translator",translated:response.text})
// }).catch(err => {
//     console.error(err);
// });

// })

//score
app.get('/score', async (req,res) => {
    try {
        const data = await ScoreModel.findOne({_id: req.params.id});
        res.send(data);
        console.log({status: 'ok', msg: 'get one'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
  })


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

