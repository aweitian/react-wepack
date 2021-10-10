const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 4001});
wss.on('connection', (ws) => {
    console.log('socket connection success');
    let buffer = "";
    //接受数据
    ws.on('message', (res) => {
        let data = res.toString('utf8');
        // console.log(res.toString('utf8'));
        // console.log(JSON.stringify(res));
        // console.log("-----------------")
    //   let data = res.Data.toString();
    data = JSON.parse(data);
      if(data.Data == "\r") {
          console.log("entry received");
          ws.send(buffer);
          buffer="";
          data = "\r\n\x1b[33m$\x1b[0m ";
          ws.send(data);
      } else {
          buffer += data.Data;
      }
    //   if(buffer.length>4)
    //     ws.send(buffer);
    //     buffer="";
    });
  });