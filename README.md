# miniprogram-emotion

>小程序显示emoji表情，可用作聊天类程序，支持原生微信小程序和wepy等框架开发。

## 程序实现  

 利用Trie树实现表情字符串快速查询替换
 
## 使用  

  1. 复制目录 **utils** 下 **emotion.js** 文件至你自己的项目中    
  
  2. 导入  
  > 原生小程序  
  ```
  const emotion = require('./emotion')  //注意路径
  
  this.setData({
    text: emotion.default.emotionParser('Hello World! /::>')
  })
  ```
  > wepy 框架  
  ```
  import emotion from '../../utils/emotion'
  
  this.text = emotion.emotionParser('Hello World! /::>')
  this.$apply()
  ```
  
  3. wxml模板  注意这里要用 **rich-text** 组件来展示效果 
  ```
    <rich-text nodes="{{text}}"></rich-text>
  ```
  
  4. 最终显示效果  
  
  > Hello World! <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif" alt="/::>" />
