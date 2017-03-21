const connector = require('./connector');
const _ = require('lodash');

// Total hits
var hits = 0;
var recentHits = 0;
var uniqueVisitors = {};
var events = {};
var props = {};
var eVars = {};

var stopAfter = 1000;

connector.on('hit', function (hit) {
    // Increment total hit counter.
    ++hits;
    
    // Increment total hit counter.
    ++recentHits;
    
    // Calculate Active Visitors on site.
    if(!uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh]) {
        uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh] = true;
    }
    
    // All Events.
    if(hit.events) {
        _.each(hit.events, function (item, key) {
            events[key] = events[key] ? events[key] + 1 : 1;
        });
    }
   
    // All Props.
    if(hit.props) {
        _.each(hit.props, function (item, key) {
            props[key] = props[key] ? props[key] + 1 : 1;
            props[key] = props[key] || {};
            props[key][item] = props[key][item] ? props[key][item] + 1 : 1;
        });
    }
    
    // All eVars.
    if(hit.evars && hit.evars.evars) {
        _.each(hit.evars.evars, function (item, key) {
            eVars[key] = eVars[key] || {};
            eVars[key][item] = eVars[key][item] ? eVars[key][item] + 1 : 1;
        });
    }

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
        recentHits: recentHits,
        uniqueVisitors: _.keys(uniqueVisitors).length,
        events: events,
        props: props,
        eVars: eVars
    };
    
    recentHits = 0;
    
    return result;
});
