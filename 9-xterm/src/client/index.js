import React from 'react';
import ReactDOM from 'react-dom';

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'



class APP extends React.Component {

    constructor() {
        super();

    }


    componentDidMount() {
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


        term.open(this.refs.terminal)
        // 换行并输入起始符 $
        term.prompt = _ => {
            term.write("\r\n\x1b[33m$\x1b[0m ")
        }


        term.prompt()
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

        this.term = term
        this.runFakeTerminal()
    }


    runFakeTerminal() {
        let _this = this
        let term = _this.term
        if (term._initialized) return
        // 初始化
        term._initialized = true
        term.writeln("Welcome to \x1b[1;32mGondar\x1b[0m.")
        term.writeln('This is Web Terminal of Modb; Good Good Study, Day Day Up.')
        term.prompt()
        // 添加事件监听器，支持输入方法
        term.onKey(e => {
            const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey
            if (e.domEvent.keyCode === 13) {
                term.prompt()
            } else if (e.domEvent.keyCode === 8) { // back 删除的情况
                if (term._core.buffer.x > 2) {
                    term.write('\b \b')
                }
            } else if (printable) {
                term.write(e.key)
            }
            console.log(1, 'print', e.key)
        })
        term.onData(key => {  // 粘贴的情况
            if (key.length > 1) term.write(key)
        })
    }







    render() {
        return (<div id="terminal" ref="terminal"></div>)
    }
}

ReactDOM.render(<APP />, document.getElementById('root'));