const connector = require('./connector');
const _ = require('lodash');

// Total hits
var hits = 0;
var recentHits = 0;

var stopAfter = 1000;

connector.on('hit', function (hit) {
    // Increment total hit counter.
    ++hits;
    
    // Increment total hit counter.
    ++recentHits;

    console.log('hit');
    
    // Exercise 2: Examine the hit.
    // Kill after after a certain # of hits.
    if (hits == stopAfter) {
        process.exit();
    }
});

connector.on('writeToDB', function () {
    var result = {
        totalHits: hits,
        recentHits: recentHits
    };
    
    recentHits = 0;
    
    return result;
});
