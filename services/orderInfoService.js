'use strict';

exports.validate = (orderInfo) => {
    //basic validation first
    return true;
};

exports.autoComplete = (orderInfo) => {
    orderInfo.model = 'online';
};