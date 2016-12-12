/**
 * Created by hwh on 16/12/9.
 */
var request = require('request')
(function(){
  request.post({
    url:'http://127.0.0.1:4000/upload',
    json:{user:'wsd',content:'i love you'}
  },function(e,r,body){
    console.log(body)
  })
})()