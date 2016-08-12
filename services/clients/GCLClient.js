'use strict';
var restify = require('restify');

var logger = require('../../lib/logger');

var restClient = restify.createJsonClient({
    url: 'http://121.40.82.99:18002'
});


exports.proposal = (reqObj, cb) => {
    restClient.post('/external/insure/GCL/wx', reqObj, function (err, req, res, obj) {
        cb(err, obj);
    });
};