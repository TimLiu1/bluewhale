'use strict';

var mongoose = require('mongoose');
var updatedtimestamp = require('mongoose-updated_at');
var validator = require('../lib/validator');
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 投保单基本信息[人身险]
 */
var lifeInsuranceSchema = new mongoose.Schema({
    //来源 01-手机,02-微信,03-pc,04-外部平台
    source: {
        type: String,
        enum: ['01', '02', '03', '04'],
        default: '01'
    },
    //省份代码
    provinceCode: String,
    //省份名称
    provinceName: String,
    //城市编号
    cityCode: String,
    //城市名称
    cityName: String,
    //投保单号
    proposalNo: String,
    //保单号
    policyNo: String,
    //机构
    branch: String,
    //业务员
    agentId: ObjectId,
    //保单归属保险公司
    providerCode: String,
    //保险公司名称
    providerName: String,
    //产品代码
    rationType: String,
    //产品名称
    riskName: String,
    //险种代码
    riskCode: String,
    //保险起期	
    startDate: Date,
    //保险止期	
    endDate: Date,
    
    //备注	
    remark: String,
    //核保状态
    underwriteInd: String,
    //总保额	
    sumAmount: Number,
    //总保费	
    sumPremium: Number,
    //投保份数	
    unitCount: String,
    //保费
    unitPremium: Number,
    //订单号	
    orderNo: String,
    //投保人数	
    holderNum: String,
    //受益人类型 1-法定 2-指定
    benType:String,
    //被保险人同投保人标志 0-否  1-是 
    isaFlag:String,
    //投保人信息
    appliInfo: {
        //客户代码	
        appCode: String,
        //客户名称	
        partyName: String,
        //性别		
        gender: String,
        //证件类型	
        identifyType: String,
        //证件号码	
        identifyNumber: String,
        //出生日期	
        birthday: Date,
        //公司电话	
        companyPhone: String,
        //移动电话	
        mobile: String,
        //邮箱	
        email: String,
        //工作单位	
        workDpt: String,
        //地址/住址
        address: String,
        //职业类别	
        occupationType: String,
        //邮编	
        zipCode: String,
        //省份代码	
        appliItemProvinceCode: String,
        //省份名称	
        appliItemProvinceName: String,
        //城市代码	
        appliItemCityCode: String,
        //城市名称	
        appliItemCityName: String,
    },
    //被保人信息
    insuredInfo: {
        //被保人代码	
        insuredCode: String,
        //被保人名称	
        partyName: String,
        //被保险人与投保人关系	
        insRelationApp: String,
        //性别	
        gender: String,
        //证件类型	,
        identifyType: String,
        //证件号码	
        identifyNumber: String,
        //出生日期	
        birthday: Date,
        //公司电话	
        companyPhone: String,
        //移动电话	
        mobile: String,
        //邮箱	
        email: String,
        //地址/住址
        address: String,
        //职业类别	
        occupationType: String,
        //邮编	
        zipCode: String
    },
    //受益人信息
    beneInfo: {
        //受益人代码	
        benCode: String,
        //受益人名称	
        benName: String,
        //被保险人与受益人关系
        benAppRelationShip: String,
        //性别	
        benGender: String,
        //受益人证件类型	
        benIdType: String,
        //受益人证件号码	
        benIdNumber: String,
        //出生日期	
        benBirthday: Date,
        //受益比例	
        benRate: Number,
        //备注	
        benRemark: String
    },
    //标的信息
    insuranceObjectInfo: {
        //家庭坐落地址	
        address: String,
        //投保财产地址	
        tgtAddr: String,
        //房屋主体结构	
        housetype: String,
        //房龄	
        houseAge: Number,
        //房屋价格	
        housePrice: Number,
        //车牌号码	
        licenseNo: String,
        //发动机号	
        engineNo: String,
        //车辆识别代码	
        frameNo: String,
        //核定载客	
        seatCount: Number
    },

    //投保日期	
    inputDate: {
        type: Date,
        default: Date.now
    },
    //操作员代码	
    handlerCode: String,
    //同步状态
    asyncStatus: {
        type: String,
        default: 0
    },
    //同步结果
    asyncResultMsg: {
        type: String,
        default: 0
    },
    //同步日期
    asyncDate: {
        type: Date
    },
}, {
        collection: 'life_insurance'
    });

module.exports = mongoose.model('LifeInsurance', lifeInsuranceSchema);