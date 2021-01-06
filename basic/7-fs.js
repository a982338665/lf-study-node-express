
const fs = require('fs');

fs.readFile('./7-fs.js',(err,data)=>{
    if(err) throw  err;
    console.log(data);
    console.log(data.toString());
});

