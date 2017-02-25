const connector = require('./connector');
const _ = require('lodash');

// Total hits
// Unique Visitors
// Events

var hits = 0;
var uniqueVisitors = {};
var events = {};
var props = {};
var eVars = {};

connector.on('hit', function (hit) {
  // TODO: process hit
  ++hits;

  if(!uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh]) {
    uniqueVisitors[hit.visIdLow + '' + hit.visIdHigh] = true;
  }

  if(hit.events) {
    _.each(hit.events, function (item, key) {
      events[key] = events[key] ? events[key] + 1 : 1;
    });
  }

  // if(hit.props) {
  //   _.each(hit.props, function (item, key) {
  //     props[key] = props[key] ? props[key] + 1 : 1;
  //   });
  // }

  if(hit.evars && hit.evars.evars) {
    _.each(hit.evars.evars, function (item, key) {
      eVars[key] = eVars[key] || {};
      eVars[key][item] = eVars[key][item] ? eVars[key][item] + 1 : 1;
    });
  }
  // console.log(hit);
});

connector.on('writeToDB', function () {
  console.log('write');

  // clear out events

  return {
    hits: hits,
    uniqueVisitors: _.keys(uniqueVisitors).length,
    events: events,
    props: props,
    eVars: eVars
  };
});
