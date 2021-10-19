import React from 'react';
import ReactDOM from 'react-dom';

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
// import { AttachAddon } from 'xterm-addon-attach'
const { Client } = require('ssh2');

class APP extends React.Component {

    constructor() {
        super();
    }


    componentDidMount() {
        this.initSsh();
    }


    initTerm() {
        let term = new Terminal({
            rendererType: "canvas", //渲染类型
            rows: 40, //行数
            cols: 100, // 不指定行数，自动回车后光标从下一行开始
            convertEol: true, //启用时，光标将设置为下一行的开头
            // scrollback: 50, //终端中的回滚量
            disableStdin: false, //是否应禁用输入
            // cursorStyle: "underline", //光标样式
            cursorBlink: true, //光标闪烁
            theme: {
                foreground: "#ECECEC", //字体
                background: "#000000", //背景色
                cursor: "help", //设置光标
                lineHeight: 20
            }
        });
        let that = this;

        term.open(this.refs.terminal)
        // 换行并输入起始符 $
        term.prompt = _ => {
            term.write("\r\n\x1b[33m$\x1b[0m ")
        }


        term.prompt()

        // const attachAddon = new AttachAddon(this.socket);
        // term.loadAddon(attachAddon);

        // canvas背景全屏
        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        fitAddon.fit()

        window.addEventListener("resize", function () {
            try { // 窗口大小改变时，触发xterm的resize方法使自适应
                fitAddon.fit()
            } catch (e) {
                console.log("e", e.message)
            }
        })

        term.writeln("Welcome to \x1b[1;32mGondar\x1b[0m.")
        term.prompt()
        term.onData(key => {  // 粘贴的情况
            this.stream.write(key);
        })
        this.term = term
    }

    initSsh() {
        this.conn = new Client();
        this.conn.on('ready',() => this.sshReady.call(this));
        this.conn.connect({
            host: '127.0.0.1',
            port: 2222,
            username: 'gondar',
            password: '000000'
        });
    }

    sshReady() {
        console.log('Client :: ready');
        this.initTerm();
        let that = this;
        this.conn.shell((err, stream) => {
            if (err) throw err;
            stream.on('close', () => {
                console.log('Stream :: close');
                conn.end();
            }).on('data', (data) => {
                console.log('OUTPUT: ' + data);
                that.term.write(data.toString());
            });
            //stream.end('pwd\nexit\n');
            that.stream = stream;
        });
    }



    render() {
        return (<div id="terminal" ref="terminal"></div>)
    }
}

ReactDOM.render(<APP />, document.getElementById('root'));