/**
 * Created by hwh on 16/12/9.
 */
var app = require('koa')();
var router = require('koa-frouter');
var bodyparser = require('koa-bodyparser');
var static = require('koa-static');
var cors = require('koa-cors');
//允许跨域访问
app.use(cors());
//指定服务器的静态资源地址，在当前目录下的文件可以直接localhost:3000/filename访问到
app.use(static('static'));

app.use(bodyparser());
app.use(router(app,'routers'));

app.listen(3000,function(){
  console.log('Server listening on:',3000);
})