'use strict';
var Promise = require('bluebird');

var logger = require('../../lib/logger');

var providerList = ['GCL'];

var transformerList = {};
var clientList = {};


//load transformers and clients
for(let provider of providerList){
    let providerTransformer = '../transformers/' + provider + 'Transformer';
    transformerList[provider] = require(providerTransformer);
    logger.info('transformer loaded:', providerTransformer);

    let providerClient = '../clients/' + provider + 'Client';
    clientList[provider] = require(providerClient);
    Promise.promisifyAll(clientList[provider]);
    logger.info('transformer loaded:', providerClient);

}

exports.getTransformer = (provider) => {
    return transformerList[provider];
};

exports.getClient = (provider) => {
    return clientList[provider];
};