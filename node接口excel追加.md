

### 主要内容
    
    正常使用的前提：
        npm i exceljs --save
        npm i moment --save
    
#### 1.生成本地文件

    readExcel(data, rule, isReadPath, isWritePath)

#### 2.响应到浏览器

    exportExcel(data,null, rule,isReadPath,'result.xlsx')


## 测试访问
    
    curl --location --request GET 'localhost:3000/excelappend/get'
