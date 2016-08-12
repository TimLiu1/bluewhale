'use strict';
var Promise = require('bluebird'); 

var logger = require('../lib/logger');

var proposalHandler = require('./handlers/proposalHandler');

exports.validate = (proposal) => {
    //basic validation first
    if(proposal.mainInfo == null){
        return Promise.reject("保单主信息不能为空");
    }

    if(proposal.mainInfo.sumAmount == null){
        return Promise.reject("保额不能为空");
    }

    if(proposal.mainInfo.sumPremium == null){
        return Promise.reject("保费不能为空");
    }

    return Promise.resolve(proposal);
};

exports.autoComplete = (proposal) => {
    proposal.source = '04';
    proposal.branch = 'HB';
    proposal.agentId = '5456027b0903dfd84169c124';
    proposal.providerCode = 'GCL';
    proposal.providerName = '中意';

    proposal.mainInfo.provinceCode = '300000';
    proposal.mainInfo.provinceName = '上海市';
    proposal.mainInfo.cityCode = '300001';
    proposal.mainInfo.cityName = '上海市';

    proposal.handlerCode = 'system';
    proposal.createdBy = 'system';
    proposal.updatedBy = 'system';
    return Promise.resolve(proposal);
};

exports.proposal = (proposal, cb) => {
    let providerTransformer = proposalHandler.getTransformer(proposal.providerCode);
    let providerClient = proposalHandler.getClient(proposal.providerCode);
    
    let reqObj = providerTransformer.proposalOut(proposal);
    logger.info('reqObj:', reqObj);
    return providerClient.proposalAsync(reqObj).then((resObj) => {
        logger.info('resObj:', resObj);
        resObj = providerTransformer.proposalIn(resObj);
        logger.info('resObj:', resObj);
        if(resObj.code == '000'){
            proposal.mainInfo.proposalNo = resObj.proposalNo;
            proposal.mainInfo.policyNo = resObj.policyNo;
            return proposal.save();
        }else{
            //error
            return Promise.reject(resObj.msg);
        }
    }).then((proposal) => {
        logger.info('proposal saved:', proposal);
        return proposal;
    }).catch((err) => {
        logger.info('proposal err:', err);
        return Promise.reject(err);
    });
};