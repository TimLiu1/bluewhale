'use strict';
var winston = require('winston');
var _logger = null;
var _logger = function() {
    return {
        init: function(loggerLevel) {
            console.log('logger level = %s', loggerLevel);
            _logger = new(winston.Logger)({
                transports: [
                    new(winston.transports.Console)({
                        level: loggerLevel
                    })
                ]
            });
        },
        debug: function(message, object) {
            if (object) {
                _logger.log('debug', message + '%j', object, {});
            } else {
                if (typeof message === 'object') {
                    _logger.log('debug', JSON.stringify(message));
                } else {
                    _logger.log('debug', message);
                }
            }
        },
        log: function(message, object) {
            if (object) {
                _logger.log('debug', message + '%j', object, {});
            } else {
                if (typeof message === 'object') {
                    _logger.log('debug', JSON.stringify(message));
                } else {
                    _logger.log('debug', message);
                }
            }
        },
        info: function(message, object) {
            if (object) {
                _logger.log('info', message + '%j', object, {});
            } else {
                if (typeof message === 'object') {
                    _logger.log('info', JSON.stringify(message));
                } else {
                    _logger.log('info', message);
                }
            }
        },
        warn: function(message, object) {
            if (object) {
                _logger.log('warn', message + '%j', object, {});
            } else {
                if (typeof message === 'object') {
                    _logger.log('warn', JSON.stringify(message));
                } else {
                    _logger.log('warn', message);
                }
            }
        },
        error: function(message, object) {
            if (object) {
                _logger.log('error', message + '%j', object, {});
            } else {
                if (typeof message === 'object') {
                    _logger.log('error', JSON.stringify(message));
                } else {
                    _logger.log('error', message);
                }
            }
        },
        logger: function() {
            return _logger;
        }
    }
};

module.exports = _logger();