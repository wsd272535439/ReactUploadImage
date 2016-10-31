/**
 * Created by hwh on 16/10/21.
 */
var path = require('path');

module.exports = {
    port:process.env.PORT || 3000,
    mongodb:{
        url:'mongodb://127.0.0.1:27017/club'
    },
    schemeConf:path.join(__dirname,'./default.scheme'),
    routerConf:'routes',
    routerCacheConf:{
        '/':{
            expire:10*1000,
            condition: function () {
                return !this.session || !this.session.user;
            }
        }
    }
}