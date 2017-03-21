const connector = require('./connector');
const _ = require('lodash');

// Total hits
var hits = 0;

connector.on('hit', function (hit) {
    // Increment total hit counter.
    ++hits;

    console.log(hit);
});

connector.on('writeToDB', function () {
  
});
