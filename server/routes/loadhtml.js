/**
 * Created by hwh on 16/10/26.
 */
var fs = require('fs');
var co = require('co');
var path = require('path');
var crypto = require('crypto');

function md5 (data){
    return crypto.createHash('md5').update(data).digest('hex');
}

function readFile(path){
    return function(cb){
        fs.readFile(path,{encoding:'utf8'},cb);
    }
}

exports.get = function * (){
    var homeDir = path.resolve(__dirname, '..')
    console.log('request',homeDir);
    var dataA = yield readFile(path.join(homeDir+'/theme/lll.html'));

    this.set({'Etag':md5(dataA)})
    this.body = dataA
}

