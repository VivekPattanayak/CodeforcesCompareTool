//Import
const express = require('express')
const app = express()
let port = process.env.PORT ;
if (port == null || port == "") {
    port = 3000 ;
}

//Files
app.use(express.static('public'));

//Views
app.set('views', './views');
app.set('view engine', 'ejs');

//Default
app.get("/", function (req, res) {
    res.render("index");
});

app.get(" ", function (req, res) {
    res.render("index");
});

app.listen(port, () => console.info(`Ok -> Port: ${port}`))