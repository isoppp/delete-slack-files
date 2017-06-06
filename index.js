// https://api.slack.com/methods/files.list

const requestPromise = require('request-promise');
const oneDayMSec = 86400000;
const getFiles = function (uri) {
  const options = {
    method: 'POST',
    uri: uri,
    body: {
      ts_to: new Date() - oneDayMSec * 30
    },
    json: true
  };
  return requestPromise(options);
};
getFiles('//slack.com/api/files.list')
  .then(function (json) {
    // Process json...
    console.log(json);

  })
  .catch(function (err) {
    // Crawling failed...
  });
