'use strict';

var mongoose = require('mongoose');
var updatedtimestamp = require('mongoose-updated_at');

// 订单信息
var orderInfoSchema = new mongoose.Schema({
    //城市编号
    cityCode: String,
    //模式 online-线上，offline-线下
    model: String,
    //保单归属保险公司
    providerCode: String,
    //保险公司名称
    providerName: String,
    //业务员(手机号)
    salesMan: String,
    //投保单ID
    proposalID: String,
    //投保单号
    proposalNo: String,
    //保单号
    policyNo: String,
    // 商业险保单号
    busPolicyNo: String,
    // 交强险保单号
    forcePolicyNo: String,
    //产品名称
    riskName: String,
    //保费金额
    account: Number,
    //投保人
    appliName: String,
    //车牌号
    licenseNo: String,
    //车险支付标识
    carPay: String,
    //支付类型
    payType: String,
    //支付方式
    payMethod: String,
    //快钱交易时间
    dealTime: String,
    //快钱交易号
    dealId: String,
    //银行交易号
    bankDealId: String,
    //银行编号
    bankCode: String,
    //银行名称
    bankName: String,
    //支付状态
    payFlag: {
        type: String,
        default: "0"
    },
    //异常件标志
    abnormal: String,
    //投保单起保日期
    startDate: Date,
    //投保单终保日期
    endDate: Date,
    //订单状态 0-无效 1-有效
    isValid:{
        type: String,
        default: "1"
    },
    //支付链接
    payUrl: String,
    //支付过期时间
    payOutTime: String,

    /**********************************************天平车险订单用的属性 begin***/
    //订单支付时间
    payTime: Date,
    //订单号
    orderId: String,
    //支付号
    payNo: String,
    //子订单信息
    subOrderList: [{
        //类型
        type: String,
        //子订单号
        subOrderId: String,
        //产品ID
        itemId: String,
        //保费
        premium: Number,
        //投保单号
        proposalNo: String,
        //保单号
        policyNo: String
    }],
    /********************************************天平车险订单用的属性 end***/

    //创建用户
    createdBy: String,
    //更新用户
    updatedBy: String,
    //创建时间
    createdAt: { type: Date, default: Date.now },
    //更新时间
    updatedAt: Date,
    
}, {
    collection: 'order_info'
});

orderInfoSchema.plugin(updatedtimestamp);
module.exports = mongoose.model('OrderInfo', orderInfoSchema);
