'use strict';
var db = require('../lib/database');
var logger = require('../lib/logger');
var cacheHelper = require('../lib/cacheHelper');
var responseJSON = require('../lib/middlewear/responseJSON');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport(eventargs) {
    });

    app.on('middleware:before:router', function configAfterRouter(eventargs) {
    });

    app.on('middleware:after:router', function configAfterRouter(eventargs) {
        //app.use(errorMessages());
        app.use(responseJSON());
    });

    return {
        onconfig: function(config, next) {
            //初始化数据库连接
            logger.init(config.get('loggerLevel'));
            db.config(config.get('databaseConfig'));
            cacheHelper.config(config.get('cacheConfig'));

            next(null, config);
        }
    };

};
