// https://api.slack.com/methods/files.list

const argv = require('yargs')
  .string('token')
  .number('before')
  .boolean('nodelete')
  .argv;

const requestPromise = require('request-promise');
const oneDayMSec = 86400000;
const getFiles = function (uri) {
  return requestPromise(options);
};

const fileListAPIoptions = {
  method: 'POST',
  uri: 'https://slack.com/api/files.list',
  form: {
    token: argv.token,
    ts_to: Math.floor((new Date().getTime() - oneDayMSec * argv.before || 30) / 1000)
  },
  json: true
};

requestPromise(fileListAPIoptions)
  .then(function (json) {
    if (argv.nodelete) return;
    console.log('delete files...');

    return Promise.all(json.files.map(function (item) {
      console.log(`File ID: ${item.id}`);

      const fileDeleteAPIoptions = {
        method: 'POST',
        uri: 'https://slack.com/api/files.delete',
        form: {
          token: argv.token,
          file: item.id
        },
        json: true
      };

      return requestPromise(fileDeleteAPIoptions)
        .then(function (json) {
          console.log(json);
        })
        .catch(function (err) {
          console.error(err);
        })
    }));
  })
  .catch(function (err) {
    console.error(err);
  });
