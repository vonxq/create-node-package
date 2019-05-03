
## CLI工具使用
  npm link
  sayHi
  vonxq-create test targetFolderName
## CLI工具制作过程
### 最简单的sayHi
1. npm init
2. package中加入bin:
   ```
     "bin": {
        "sayHi": "./bin/sayHi.js"
      },
   ```
3. /bin/sayHi.js内容如下:
   ```javascript
    #!/usr/bin/env node 
    // 上面这句话主要是帮助脚本找到node的脚本解释器，可以理解为调用系统中的node来解析我们的脚本。
    console.log('Hi,I am vonxq-react-cli')
   ```
4. 目录下执行sayHi,若找不到命令，执行下npm link，重新执行sayHi，可看到正确输出'
   npm link会将当前项目放到npm的global目录中，当前项目的bin命令会变成全局命令
  其它项目可通过`npm link 当前项目名称`命令将当前项目添加到项目node_modules中
   
### 认识工具
命令定义与解析执行
`yarn add commander`  具体使用可查看bin/list内容

es6支持
`yarn add -D @babel/core babel-cli babel-plugin-transform-es2015-modules-commonjs babel-preset-latest-node`
`yarn add babel-preset-env"`
.babelrc如下:
```
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }]
  ],
  "plugins": ["transform-es2015-modules-commonjs"]
}
```
