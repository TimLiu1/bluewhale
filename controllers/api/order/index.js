'use strict';
var Promise = require('bluebird');

var logger = require('../../../lib/logger');
var OrderInfo = require('../../../models/OrderInfo');
var PropertyProposal = require('../../../models/PropertyProposal');

var orderInfoService = require('../../../services/orderInfoService');
var proposalService = require('../../../services/proposalService');

// Promise.promisifyAll(proposalService);

module.exports = (app) => {
    
    //query order info by order id
    app.get('/byid/:orderId', (req, res, next) => {
        var orderId = req.params.orderId;
        logger.info('orderId:', orderId);
        OrderInfo.findOne({_id: orderId}).then((orderInfo) => {
            logger.info('orderInfo:', orderInfo);
            res.locals.data = orderInfo;
            return next();
        }).catch((err) => {
            logger.info('query error:', err);
            res.locals.err = "查询订单失败";
            return next();
        });
    });

    //create order info
    app.post('/', (req, res, next) => {
        var orderInfoJson = req.body.data;
        logger.info('orderInfoJson:', orderInfoJson);
        if(orderInfoJson === undefined){
            res.locals.err = "订单信息不能为空";
            return next();
        }
        var orderInfo = new OrderInfo(orderInfoJson);
        
        //validate order info
        if(!orderInfoService.validate(OrderInfo)){
            res.locals.err = "订单信息验证失败";
            return next();
        }

        //auto complete order info
        orderInfoService.autoComplete(orderInfo);
        
        //save order info
        orderInfo.save().then((orderInfo) => {
            logger.info("orderInfo saved:", orderInfo);
            res.locals.data = {_id: orderInfo._id};
            return next();
        },(err) => {
            logger.info("orderInfo save error:", err);
            res.locals.err = "订单创建失败";
            return next();
        });

    });

    //create proposal
    app.post('/:orderId/proposal', (req, res, next) => {
        var orderId = req.params.orderId;
        var proposalJson = req.body.data;
        logger.info('orderId:', orderId);
        logger.info('proposalJson:', proposalJson);
        
        var proposal = new PropertyProposal(proposalJson);
        
        //validate proposal info
        proposalService.validate(proposal).then((proposal) => {
            //auto complete proposal info;
            proposalService.autoComplete(proposal).then((proposal) => {
                //to proposal
                proposalService.proposal(proposal).then((proposal) => {
                    logger.info("proposal created:", proposal);
                    res.locals.data = proposal;
                    return next();
                }).catch((err) => {
                    logger.info("create proposal error:", err);
                    res.locals.err = "保单创建失败:"+err;
                    return next();
                });
            });
        }).catch((err) => {
            logger.info('validation failed:', err);
            res.locals.err = "订单信息验证失败:"+err;
            return next();
        });

    });

}