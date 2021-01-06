/*!
    node在编译后 ，浏览器中实际为
    (
        function(exports,require,module,__filename,__dirname){
            //code 里面才是真正程序编写内容
        }
    );
 */

//实际 exports 是 module.exports 的快捷方式
const exports = module.exports;


//不能对exports 重新赋值，否则原来的意义就会失效