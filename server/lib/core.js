/**
 * Created by hwh on 16/10/21.
 */
var Comment = require('./comment');
var Topic = require('./topic');
var User = require('./user');

module.exports = {
    get $User(){
        return User
    },
    get $Comment(){
      return Comment
    },
    get $Topic(){
        return Topic
    }
}

