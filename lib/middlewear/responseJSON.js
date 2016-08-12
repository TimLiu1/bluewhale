var moment = require('moment');
module.exports = function() {
    return function(req, res, next) {
        try {
            var now = moment();
            var returnData = {
                resDate: now.format()
            };
            var body = req.body;
            if (body.reqId) {
                returnData.reqId = body.reqId;
            }
            if (body.traceId) {
                returnData.traceId = body.traceId;
            }
            if (body.transId) {
                returnData.transId = body.transId;
            }
            if (body.version) {
                returnData.version = body.version;
            }
            if (body.from) {
                returnData.from = body.from;
            }
            if (body.to) {
                returnData.to = body.to;
            }
            returnData.code = res.locals.code || '000';
            returnData.msg = res.locals.msg || 'success';
            if (res.locals.err) {
                returnData.code = '999';
                returnData.msg = res.locals.err;
            }

            returnData.data = res.locals.data || {};
            res.json(returnData);
        } catch (err) {
            console.log(err);
            returnData.code = '999';
            returnData.msg = '系统错误';
            res.json(returnData);
        }
        
    };
};
