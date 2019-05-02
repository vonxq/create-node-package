#!/usr/bin/env node
// babel解析
require( "babel-register" )
require( "@babel/core" )
	.transform( "code", {
		presets: [ [ require( 'babel-preset-latest-node' ), {
			target: 'current'
		} ] ]
	} );
require( 'babel-polyfill' )
// 下面可写es6语法

/* process.argv属性返回一个数组，其中包含启动Node.js进程时传递的命令行参数。
*第一个元素是process.execPath， 如果需要访问argv[0]的原始值，可以使用process.argv0
* 第二个元素将是要执行的JavaScript文件的路径， 其余元素将是任何其他命令行参数。
* 如: C:\Program Files\nodejs\node.exe,C:\Users\fengxueqin\AppData\Roaming\npm\node_modules\vonxq-react-cli\bin\sayHi.js,hahah,haha
*/
// console.log(`${process.argv}`)
console.log(`Hi, ${process.argv[2]}`)
console.log('This is a npm cli demo with cli')

const a = () => {
  console.log('I am an arrow function')
}
a()
test()