/**
 * Created by hwh on 16/10/27.
 */
var bodyParse = require('co-busboy');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');

exports.post = function *(){
    var parts = bodyParse(this.request)
    //console.log('body',yield parts);
    var part;
    var fileNames = []
    while (part = yield parts){
        console.log('part',part);
        var filename = part.filename
        fileNames.push(filename)
        console.log('upload',filename)
        var homeDir = path.resolve(__dirname, '..')

        var newpath = homeDir + '/theme/'+ filename;
        var stream = fs.createWriteStream(newpath);

        part.pipe(stream);
        //var files = part.pipe()
        //var stream = fs.createWriteStream(path.join('../theme',parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext));
        //console.log('www.baidu',stream)
    }
    if(fileNames.length > 0){
        var imgUrls = [];
        for (var item of fileNames){
            imgUrls.push('http://localhost:3000/' + item)
        }
        this.body = {
            code:0,
            message:'上传成功',
            result:{
                urls:imgUrls
            }
        }
    }
}