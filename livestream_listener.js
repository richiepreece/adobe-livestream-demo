const connector = require('./connector');

var hits = 0;

connector.on('hit', function (hit) {
  // TODO: process hit
  ++hits;
  // console.log(hit);
});

connector.on('writeToDB', function () {
  console.log('write');

  return {
    hits: hits
  };
});
