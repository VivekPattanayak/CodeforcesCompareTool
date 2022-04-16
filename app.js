//Import
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto');

require('dotenv').config()
require('./login')

const user_object = require('./models/loginschema')

//Files
app.use(express.static('public'));

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Views
app.set('views', './views');
app.set('view engine', 'ejs');

//Default
app.get("/", function (req, res) {
    let str = 'Please login to access more features!'
    if(process.env.LOGGED_IN!=0){
        str = `Welcome ${process.env.USERID} !`
    }
    res.render("index",{login_message: str,user_id:process.env.USERID , login_status:process.env.LOGGED_IN});
});

app.get("/login", function (req, res) {
    res.render("login",{reg_status:process.env.REG_STATUS, login_status:process.env.LOGGED_IN});
    process.env.REG_STATUS=''
});

app.get("/register", function (req, res) {
    res.render("register",{user_repeat:process.env.USER_REPEAT,login_status:process.env.LOGGED_IN});
    process.env.USER_REPEAT=''
});

app.get("/profile", function (req, res) {
    res.render("profile",{login_status:process.env.LOGGED_IN});
});

app.get("/logout", (req,res) => {
    process.env.USERID='default_value_hash_3110'
    process.env.LOGGED_IN=0
    res.redirect("/");
})

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/login',async (req,res)=>{
    req.body.userpassword = crypto.createHash('md5').update(req.body.userpassword).digest("hex");
    const new_user = new user_object({
        userId : req.body.userid,
        password : req.body.userpassword
    })
    const a = await user_object.find({userId : req.body.userid})
    a.map(doc => doc.name).sort();
    if(a.length==0){
        process.env.REG_STATUS = 'User not found!'
        res.redirect('/login')
    }
    else{
        const fullmatch = await user_object.find({
            userId : req.body.userid,
            password : req.body.userpassword
        })
        if(fullmatch.length>0){
            process.env.USERID = req.body.userid;
            process.env.LOGGED_IN=1;
            res.redirect('/');
        }
        else{
            process.env.REG_STATUS = 'Incorrect Password!'
            res.redirect('/login')
        }
    }
    res.end()
})

app.post('/register',async (req,res)=>{
    req.body.userpassword = crypto.createHash('md5').update(req.body.userpassword).digest("hex");
    const new_user = new user_object({
        userId : req.body.userid,
        password : req.body.userpassword
    })
    const a = await user_object.find({userId : req.body.userid})
    a.map(doc => doc.name).sort();
    if(a.length==0){
        new_user.save().then(console.log('User added successfully!')).catch((err)=>err);
        process.env.REG_STATUS = 'User created successfully! Now login!'
        res.redirect('login')
    }
    else{
        process.env.USER_REPEAT = 'Username already exists!'
        console.log(process.env.USER_REPEAT)
        res.redirect('register')
    }
})


var d = new Date();
const ctime = d.toLocaleTimeString(); 


let port = process.env.PORT ;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => console.info(`Running at port ${port} at ${ctime}`))