'use strict';
var logger = require('../../lib/logger');

exports.proposalOut = (proposal) => {
    let reqObj = {
        "package" : {
            "header" : {
                "from" : "汇中",
                "requestType" : "03",
                "sendTime" : "2016-06-29 14:11:43",
                "uuid" : "bad58c92-98f3-47c3-8a6f-bb4de085d818"
            },
            "request" : {
                "custom" : [ {
                    "@type" : "投保人",
                    "birthdate" : proposal.appliInfo.birthday,
                    "email" : proposal.appliInfo.email,
                    "gender" : proposal.appliInfo.gender=='1'?'男':'女',
                    "govtID" : proposal.appliInfo.idNo,
                    "govtIDTC" : proposal.appliInfo.idType=='01'?'身份证':'其他',
                    "moblieNo" : proposal.appliInfo.mobile,
                    "name" : proposal.appliInfo.name,
                    "tripGrpID" : null,
                    "passPortID" : null,
                    "passPortNM" : null
                }, {
                    "@type" : "第一被保人",
                    "birthdate" : proposal.insuredInfo.birthday,
                    "gender" : proposal.insuredInfo.gender=='1'?'男':'女',
                    "govtIDTC" : proposal.insuredInfo.idType=='01'?'身份证':'其他',
                    "govtID" : proposal.insuredInfo.idNo,
                    "moblieNo" : proposal.insuredInfo.mobile,
                    "name" : proposal.insuredInfo.name,
                    "relation" : "本人",
                    "tripGrpID" : null,
                    "passPortID" : null,
                    "passPortNM" : null
                } ],
                "policy" : {
                    "coverage" : [ {
                        "coverageCode" : "NM18",
                        "coverageName" : "e路相伴意外险",
                        "currentAmt" : "500000",
                        "isBasic" : "Y",
                        "planNo" : "NM18",
                        "benefitLimit" : "1年",
                        "paymentDuration" : null,
                        "premium" : "99.0"
                    } ],
                    "grossPremAmtITD" : "99.0",
                    "signedDate" : "2016-07-25",
                    "effectiveBackDate" : null,
                    "isBeneficiaryDesign" : null,
                    "paymentFrequency" : null,
                    "signedPlace" : "北京"
                }
            }
        }
    };
    return reqObj;
};

exports.proposalIn = (resObj) => {
    // resObj = {
    //     "package" : {
    //         "header" : {
    //             "errorMessage" : null,
    //             "from" : "中意人寿",
    //             "requestType" : "03",
    //             "responseCode" : "0",
    //             "sendTime" : "2016-08-09 20:40:56",
    //             "uuid" : "bad58c92-98f3-47c3-8a6f-bb4de085d818"
    //         },
    //         "response" : {
    //             "clientNo" : "59124538",
    //             "fullName" : "汇中",
    //             "grossPremAmtITD" : "99",
    //             "isSuccess" : "0",
    //             "policyNo" : "30202783",
    //             "proposalNo" : "500107051"
    //         }
    //     }
    // };

    return {
        code: resObj.package.response.isSuccess=='0'?'000':'999',
        msg: resObj.package.response.failReason,
        proposalNo: resObj.package.response.proposalNo,
        policyNo: resObj.package.response.policyNo
    };

};