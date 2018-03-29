const connector = require('./connector');
const _ = require('lodash');

// Total hits
var hits = 0;
var recentHits = 0;
var uniqueVisitors = {};
var events = {};
var props = {};
var eVars = {};
var desks = {};
var texts = [];
var eventData = [];

var stopAfter = 1000;

connector.on('hit', function (hit) {
    // Increment total hit counter.
    ++hits;

    console.log(hit);
    connector.ping();

    // Exercise 2: Examine the hit.


});

connector.on('writeToDB', function () {

});








































































































































































connector.on('deskHit', function (desk) {
    desks[desk] = desks[desk] || 0;
    desks[desk] = desks[desk] + 1;
});
