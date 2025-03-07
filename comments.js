// Create web server
// 
// Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var cors = require('cors');

// Config
var port = process.env.PORT || 8080;
var commentsFile = 'comments.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/comments', function(req, res) {
  fs.readFile(commentsFile, 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments file');
    }
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(commentsFile, 'utf8', function(err, data) {
    if (err) {
      res.status(500).send('Error reading comments file');
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsFile, JSON.stringify(comments), function(err) {
      if (err) {
        res.status(500).send('Error writing comments file');
      }
      res.send('Comment added');
    });
  });
});

// Start server
app.listen(port, function() {
  console.log('Server started on port ' + port);
});