```javascript
{
    test: /\.less$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: "less-loader",
        options: {
          lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
            modifyVars: darkTheme.default,
            javascriptEnabled: true,
          },
        }
        }
        
    ]
},
```
三个loader顺序不能错，我就在这儿花了2个小时