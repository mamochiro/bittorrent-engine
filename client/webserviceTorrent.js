var express = require('express');
var app = express();
//var files = require('./readJson.js');
var bodyParser = require('body-parser');
var fs = require('fs');

//port 
var port = process.env.PORT || 8080;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.send('<h1>Test Api</h1>');
});


app.get('/user', function (req, res) {
    res.json(file.findAll());
});

app.get('/file', function (req, res) {
    res.json(files.findAllFile());
});


app.get('/file/:id', function (req, res) {
    var id = req.params.id;
    console.log(id)
    res.json(files.findById(id));
});

app.post('/newfile', function (req, res) {
    var newdata = req.body;
    res.send('success');
    for (var i = 0; i < newdata.length; i++) {
    downloadTorrent(newdata[i]) 
    }
});


function downloadTorrent(data){
    var http = require('http');
    var fs = require('fs');
    console.log('Download ' , data.filename);
    var file = fs.createWriteStream(__dirname  + "/torrentfile/" +data.filename); 
    var request = http.get(data.URL,  function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                console.log('Download finished.');
               
            });
    });
  
}


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});

