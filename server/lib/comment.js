/**
 * Created by hwh on 16/10/21.
 */
var Comment = require('../models').Comment;

//添加一条评论
exports.addComment = function(data){
    return Comment.create(data);
}

//根据话题ID获取对应评论
exports.getCommentsByTopicId = function(id){
    return Comment.find({topic_id:id}).sort('updated_at').exec();
}