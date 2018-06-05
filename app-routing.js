var express = require ('express');
var path = require('path');
var http = require('http');

var app = express();

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine","ejs");

var IP_MALVADA = "::f";

app.use((request, response, next) => {
    if(request.ip === IP_MALVADA){
        response.status(401).send("Intento de acceso no autorizado");
    }else{
        next();
    }
});

var publicPath = path.join(__dirname,'public');
app.use('recursos',express.static(publicPath));

app.get('/',(request, response) => {
    response.render("index");
});

app.get('/Clases',(request,response) =>{
    response.render('zombies');
});

app.get('/armas',(request,response) =>{
    response.render('armas');
});
app.get('/Victimas',(request,response) =>{
    response.render('personas');
    
});

app.use((request, response) => {
    response.writeHead(404,{"Content-type":"text/html"});
    response.end("<h2>404 Not Found!</h2>");
});

http.createServer(app).listen(3000);