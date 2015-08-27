var express = require('express');
var bodyParser = require('body-parser');
var unirest = require('unirest');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {res.status(200).send('Hello world')});
app.post('/hs/card/', function(req, res) {
    var card = req.body.text;  
    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + card)
    .header("X-Mashape-Key", "VwOpOqeoWymsh1bUg5rd8NJ4xvm7p1nYhEYjsnyWLceZPNEVeY")
    .header("Accept", "application/json")
    .end(function (result) {
      console.log(result.body[0].img)
      res.status(200).send(result.body[0].img)
    });
})

app.get('/hs/card/:cardname', function(req, res) {
    var card = req.params.cardname
    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + card)
    .header("X-Mashape-Key", "VwOpOqeoWymsh1bUg5rd8NJ4xvm7p1nYhEYjsnyWLceZPNEVeY")
    .header("Accept", "application/json")
    .end(function (result) {
      try {
          res.redirect(result.body[0].img)
      }
      catch (e) {
          res.status(200).send('Could not find card name')
      }
    });
})


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message)
});

app.listen(port, function() {
    console.log('Slack bot listening on port ' + port)
});


