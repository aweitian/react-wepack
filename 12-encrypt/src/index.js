const encrypt = require('./encrypt');  //引用AES源码js
console.log(encrypt.encrypt,encrypt.default)
let aa,bb,cc,key='823dsklwe447';
aa= 'Interesting!我是中文#';
// Create heading node
const a = document.createElement('div')
a.textContent = '加密前:' + aa;

bb = encrypt.encrypt(aa,key);
const b = document.createElement('div')
b.textContent = '加密后:' + bb;

cc = encrypt.decrypt(bb,key);
const c = document.createElement('div')
c.textContent = '解密后:' + cc;
// Append heading node to the DOM
const app = document.querySelector('#root')
app.append(a)
app.append(b)
app.append(c)

