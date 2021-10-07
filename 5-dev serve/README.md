现在Babel已经设置好了，但是我们的Babel插件还没有。可以在index.js中添加一些新的语法来证明它还不能正常工作。

要解决这个问题，只需在项目的根目录中创建一个.babelrc文件。可以使用preset-env和plugin-proposal-class-properties添加更多默认值。

{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}