const { Client } = require('ssh2');

var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('OUTPUT: ' + data);
    });
    stream.end('cd / \nls -al\nexit\n');
  });
}).connect({
  host: '127.0.0.1',
  port: 2222,
  username: 'gondar',
  password: '000000'
});