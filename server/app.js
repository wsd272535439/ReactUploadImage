/**
 * Created by hwh on 16/10/21.
 */
var app = require('koa')();
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var staticCache = require('koa-static-cache');
var errorhandler = require('koa-errorhandler');
var session = require('koa-generic-session');
var MongoStore = require('koa-generic-session-mongo');
var flash = require('koa-flash');
var gzip = require('koa-gzip');
var scheme = require('koa-scheme');
var router = require('koa-frouter');
var routerCache = require('koa-router-cache');
var config = require('./config/default');
var cors = require('koa-cors');
var static = require('koa-static');

var merge = require('merge-descriptors');
var core = require('./lib/core');

merge({},core,false);

app.keys = ['wsd'];

app.use(errorhandler());
app.use(static('theme'));
app.use(cors());
app.use(bodyparser());
app.use(logger());
//app.use(session({store:new MongoStore(config.mongodb)}));
//app.use(flash());
app.use(scheme(config.schemeConf));
app.use(routerCache(app,config.routerCacheConf));
app.use(gzip());
app.use(router(app,config.routerConf));

app.listen(config.port, function () {
    console.log('Server listening on:',config.port);
})
