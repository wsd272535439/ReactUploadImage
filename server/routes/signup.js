/**
 * Created by hwh on 16/10/21.
 */
var Models = require('../lib/core');
var $User = Models.$User;

function MathRand()
{
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num
}

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
    //this.body = {
    //    code:0,
    //    name:'hwh',
    //    message:'成功'
    //}
    var userExist = yield $User.getUserByName(data.name);
    if(userExist){
        this.body = {
            code:10000,
            error:'用户已注册'
        }
    }else{
        data.uid = MathRand()
        yield $User.addUser(data)
        this.body = {
            code: 0,
            message: '注册成功',
            result: data
        }
    }
}