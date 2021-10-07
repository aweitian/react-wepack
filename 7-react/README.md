现在Babel已经设置好了，但是我们的Babel插件还没有。可以在index.js中添加一些新的语法来证明它还不能正常工作。

要解决这个问题，只需在项目的根目录中创建一个.babelrc文件。可以使用preset-env和plugin-proposal-class-properties添加更多默认值。

{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}


用了react jsx,这个问题出现了

Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation.
If you want to leave it as-is, add @babel/plugin-syntax-jsx (https://git.io/vb4yA) to the 'plugins' section to enable parsing.
    at Parser._raise (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:541:17)
    at Parser.raiseWithData (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:534:17)
    at Parser.expectOnePlugin (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:3565:18)
    at Parser.parseExprAtom (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11814:20)
    at Parser.parseExprSubscripts (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11414:23)
    at Parser.parseUpdate (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11394:21)
    at Parser.parseMaybeUnary (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11369:23)
    at Parser.parseMaybeUnaryOrPrivate (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11183:61)
    at Parser.parseExprOps (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11190:23)
    at Parser.parseMaybeConditional (C:\Users\Administrator\Desktop\webpack\7\node_modules\_@babel_parser@7.15.8@@babel\parser\lib\index.js:11160:23)

解决：
在presets中加一个
@babel/preset-react