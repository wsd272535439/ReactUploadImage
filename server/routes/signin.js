/**
 * Created by hwh on 16/10/21.
 */
var Models = require('../lib/core');
var $User = Models.$User;

function read(){
    return function(){
        this.response.status = 0;
    }
}

exports.get = function * (){
    this.body = 'hello';
};

exports.post = function * (){
    var data = this.request.body;
    var userExist = yield $User.getUserByName(data.name);
    if(data.password == userExist.password){
        this.body = {
            code:0,
            message:'登录成功',
            result:userExist
        }
    }else{
        this.body = {
            code:100000,
            error:'用户名或密码错误'
        }
    }
}

