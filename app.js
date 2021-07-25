//Import
const express = require('express')
const app = express()
const PORT = process.env.PORT || '8080' 

app.set("port",PORT);

//Files
app.use(express.static('public'));

//Views
app.set('views', './views');
app.set('view engine', 'ejs');

//Default
app.get("/", function (req, res) {
    res.render("index");
});

app.get("*", function (req, res) {
    res.render("index");
});

//app.listen(port, () => console.info(`Ok -> Port: ${port}`))