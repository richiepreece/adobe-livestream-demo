var http = require('http');
var express = require('express');
var app = express();

var ons = {};

app.set('port', '3000');

app.use(express.static('client'));

app.get('/hit/:desk', function (req, res, next) {
  ons.deskHit = ons.deskHit || [];
  for(var i = 0; i < ons.deskHit.length; i++) {
    ons.deskHit[i](req.params.desk);
  }

  res.send('ok');
});

var server = http.createServer(app).listen(app.get('port'), function () {
  'use strict';

  console.log('Express server listening on port', app.get('port'));
});

var io = require('socket.io')(server);

module.exports = {
  emit: function (title, content) {
    io.emit(title, content);
  },
  on: function (title, callback) {
    ons[title] = ons[title] || [];
    ons[title].push(callback);
  }
}
