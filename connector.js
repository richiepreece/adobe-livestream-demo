const request = require('request');
require('request').debug = true;
const fs = require('fs');
const _ = require('lodash');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
var callbacks = {};

var AdobeLiveStreamConnector = require('adobe-live-stream-connector');

var connector = new AdobeLiveStreamConnector({
  clientId: config.username, // Your Adobe client ID
  clientSecret: config.password, // Your Adobe client secret
  loopInterval: 1000, // The number of milliseconds to check connection is still alive
  maxConnections: 1, // The maximum connections you want to make to the Live Stream API
  streamUrl: config.accessPoint, // The URL to your Live Stream data
  tokenApiHost: 'api.omniture.com', // The Adobe Authentication URL
  tokenCacheFile: 'adobeAuth.token', // The name of the file to store the access token in
  trustAllSSLCerts: true // Specify whether to trust
}, (err, response) => {
  if(response && callbacks.hit) {
    _.each(callbacks.hit, function(item) {
      var result = item(response);
    });
  }
});
connector.connect();

setInterval(function () {
  _.each(callbacks.writeToDB, function (item) {
    var result = item();
    console.log(result); //TODO write to db
  });
}, 5000);

function on(type, callback) {
  callbacks[type] = callbacks[type] || [];
  callbacks[type].push(callback);
}

module.exports = {
  on: on
};
