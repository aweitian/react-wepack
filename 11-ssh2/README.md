## 单独测试SSH2
node src/ssh2/es.js


## 安装SSH2
"ssh2": "^1.5.0",

ERROR in ./node_modules/_asn1@0.2.4@asn1/lib/ber/reader.js 3:13-30
Module not found: Error: Can't resolve 'assert' in 'C:\Users\Administrator\Desktop\webpack\11-ssh2\node_modules\_asn1@0.2.4@asn1\lib\ber'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "assert": require.resolve("assert/") }'
        - install 'assert'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "assert": false }
 @ ./node_modules/_asn1@0.2.4@asn1/lib/ber/index.js 6:13-32
 @ ./node_modules/_asn1@0.2.4@asn1/lib/index.js 6:10-32
 @ ./node_modules/_ssh2@1.5.0@ssh2/lib/protocol/keyParser.js 20:16-31
 @ ./node_modules/_ssh2@1.5.0@ssh2/lib/index.js 15:21-55
 @ ./src/client/index.js 126:15-30


## 解决方式
- webpack.config.js中的target 使用 electron-renderer
- 安装"node-loader": "^0.6.0"
- webPreferences: { nodeIntegration: true, contextIsolation: false }

## 补充说明
安装ssh2需要cmake


## 运行结果
![image](https://raw.githubusercontent.com/aweitian/react-wepack/master/11-ssh2/shell.png)
