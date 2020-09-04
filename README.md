# curd-vue-element-plugin
基于Vue+ElementUI的webpack插件

## 初始化项目
```
npm install
```
## 编译Typescript
本插件使用typescript编写，`./src` 目录中为源代码，运行`tsc`生成 `index.js`和`./lib`内容

## 安装插件
```
npm install curd-vue-element-plugin -D
```

## 用法
webpack配置文件中
``` javascript
const CurdVueElementPlugin = require('curd-vue-element-plugin')
module.exports = {
  plugins: [
    new CurdVueElementPlugin({
      //……options  
    })
  ]
}
```
Vue-Cli配置文件中
```javascript
/* vue.config.js */
const CurdVueElementPlugin = require('curd-vue-element-plugin')
module.exports = {
  configureWebpack: {
    plugins: [
      new CurdVueElementPlugin({
        //……options
      })
    ]
  }
}
```

[Demo项目](https://github.com/Marstin/CurdVueElementPlugin)

## 配置
```javascript
{
  // `baseDir` 是要创建的文件根目录，默认为'./src'
  baseDir: './src', 
  // `options` 是要创建的增删改查实例配置组成的数组
  options: [{
    // `name` 是当前实例的名称，必填，其值对应最终生成的文件名
    name: 'project',
    // `serviceDir` 是请求代码生成目录，默认为'/services',
    serviceDir：'/services',
    // `componentDir` 是template代码生成目录，默认值是'/views'
    componentDir: '/views',
    // `service` 是要生成的增删改查功能配置数组，默认为['list']
    // 值只能为list,add,update,del 其他均不可识别。
    // 可阅读源码，在 `/lib/ServiceTemplate`中加入自定义的请求模板
    // 数组值可为字符串，也可为对象(如下所示)：
    /*  { 
          // `func` 值与上述数组中值对应
          func:'list',
          // `url` 值为http请求地址
          url:'……'
        } */
    service: ['list', 'add', 'update', 'del'],
    // `component` 是定义实例对应的数据model等相关配置
    component: {
      // `primaryKey` 是数据主键，删除、修改需要识别此值，默认为 'id'
      primaryKey: 'id',
      // `model` 是数据模板,必填
      model: [{
        //`name` 是该项数据对应前后端交互时对应的数据项标识
        name: 'name',
        //`text` 是该项数据前端显示的名称
        text: '姓名',
        //`isSearch` 标识是否为查询条件，默认为 false
        isSearch: true,
        //`isEdit` 标识是否为编辑/新增列，默认为 true
        isEdit: true
      }, {
        name: 'sex',
        text: '性别'
      }, {
        name: 'telephone',
        text: '手机号码',
        isSearch: true
      }, {
        name: 'email',
        text: '邮箱'
      }, {
        name: 'address',
        text: '地址',
        isEdit: false
      }]
    }
  }]
}
```



