//Import
const express = require('express')
const app = express()
let port = process.env.PORT ;
if (port == null || port == "") {
    port = 3000;
}

//Files
app.use(express.static('public'));

var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

//Views
app.set('views', './views');
app.set('view engine', 'ejs');

//Default
app.get("/", function (req, res) {
    res.render("index");
});

var d = new Date();
const ctime = d.toLocaleTimeString(); 

app.listen(port, () => console.info(`Running at port ${port} at ${ctime}`))