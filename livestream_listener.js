const connector = require('./connector');
const _ = require('lodash');

// Total hits
var hits = 0;

connector.on('hit', function (hit) {
    // Increment total hit counter.
    ++hits;

    console.log(hit);
    
    // Exercise 2: Examine the hit.

    
});

connector.on('writeToDB', function () {
    
});
