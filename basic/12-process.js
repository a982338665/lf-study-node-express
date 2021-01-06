
//读出多个属性
const {argv,argv0,execArgv,execPath,env} = process;

//argv 返回数组 可接受参数 在js之后
//例如： node 12-process-argv.js --test a=1 b=2
argv.forEach(item=>{
    console.log(item);
});

//获取argv的第一个值 node
console.log(argv0);

//可接受参数 在命令js之前 ，即打印 [--inspect]
//node --inspect 12-process-argv.js --test a=1 b=2
console.log(execArgv);

//调用路径
console.log(execPath);

//相关的环境
console.log(env);

//当前项目路径
console.log(process.cwd());

