const connector = require('./connector');

connector.on('hit', function (hit) {
  // TODO: process hit
  console.log(hit);

  // TODO: output data to database
  return {
    result: true
  };
});
