#bluewhale#
**bluewhale提供非车险接口**

---

项目地址：http://git.oschina.net/huibaotech/bluewhale
测试服务器：
服务端口：8866
请求和响应头参见：https://tower.im/s/21Op3
**请求响应头默认适用所有接口的request和response，每个接口中不再一一列出**

---

##创建订单##
> 创建订单，获得orderId

###POST /api/order###
**request part:**

NAME|TYPE|DESCRIPTION|REMARK
-|-
data|Json|业务数据|固定为{}

**request example:**
```json
{
  "data":{
  }
}
```

**response part:**

NAME|TYPE|DESCRIPTION|REMARK
-|-
data._id|String|订单ID|

**response example:**
```json
{
  "data":{
    "_id":"57a7eacebb8ea46a84ae3dba"
  }
}
```
**curl test:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"data":{}}' http://127.0.0.1:8866/api/order
```

---

##查询订单##
> 通过orderId查询订单

###GET /api/order/byid/:orderId###
**request part:**
无

**request example:**
无

**response part:**

NAME|TYPE|DESCRIPTION|REMARK
-|-
data._id|String|订单ID|

**response example:**
```json
{
  "data":{
    "_id":"57a7eacebb8ea46a84ae3dba"
  }
}
```
**curl test:**
```bash
curl http://127.0.0.1:8866/api/order/byid/57a7eacebb8ea46a84ae3dba
```

---

##创建投保单##
> 创建orderId下的投保单

###POST /api/order/:orderId/proposal###
**request part:**

NAME|TYPE|DESCRIPTION|REMARK
-|-
data.productCode|String|产品代码|
|||
**data.mainInfo**|Json|主信息|
data.mainInfo.provinceCode|String|省份代码|
data.mainInfo.cityCode|String|城市代码|
data.mainInfo.startDate|String|保险起期|
data.mainInfo.endDate|String|保险止期|
data.mainInfo.benType|String|受益人类型|1-法定;2-指定
data.mainInfo.isaFlag|Number|被保险人同被保人标志|0-否;1-是
|||
**data.appliInfo**|Json|投保人对象|
data.appliInfo.code|String|客户代码|
data.appliInfo.name|String|客户名称|
data.appliInfo.gender|String|性别|0-女;1-男
data.appliInfo.idType|String|证件类型|
data.appliInfo.idNo|String|证件号码|
data.appliInfo.birthday|Date|生日|
data.appliInfo.companyPhone|String|公司电话|
data.appliInfo.mobile|String|手机号码|
data.appliInfo.email|String|邮箱|
data.appliInfo.workDpt|String|工作单位|
data.appliInfo.address|String|住址|
data.appliInfo.occType|String|职业类型|
data.appliInfo.zipCode|String|邮编|
data.appliInfo.provinceCode|String|省份代码|
data.appliInfo.cityCode|String|城市代码|
|||
**insuredInfo**|Json|被保险人对象|同投保人data.appliInfo
|||
**data.beneInfo**|Json|受益人对象|
data.beneInfo.code|String|受益人代码|
data.beneInfo.name|String|受益人名称|
data.beneInfo.benAppRel|String|被保险人与受益人关系|
data.beneInfo.gender|String|性别|
data.beneInfo.idType|String|受益人证件类型|
data.beneInfo.idNo|String|受益人证件号码|
data.beneInfo.birthday|Date|出生日期|
data.beneInfo.remark|String|备注|
|||
**data.insTgtInfo**|Json|标的对象|
data.insTgtInfo.address|String|家庭坐落地址|
data.insTgtInfo.tgtAddr|String|投保财产地址|
data.insTgtInfo.housetype|String|房屋主体结构|
data.insTgtInfo.houseAge|Number|房龄|
data.insTgtInfo.housePrice|Number|房屋价格|
data.insTgtInfo.licenseNo|String|车牌号码|
data.insTgtInfo.engineNo|String|发动机号|
data.insTgtInfo.frameNo|String|车辆识别代码|
data.insTgtInfo.seatCount|Number|核定载客|
|||
|||
|||

**request example:**
```json
{   
    "data": {
        "productCode": "TEST0001",
        "mainInfo": {
            "provinceCode": "300000",
            "cityCode": "300001",	
            "startDate": "2016-08-08T02:13:34.246Z",
            "endDate": "2016-08-19T02:13:34.246Z",
            "benType": "2",
            "isaFlag": 0
        },
        "appliInfo": {
            "name": "托马斯",
            "gender": "1",
            "idType": "01",
            "idNo": "310225198808301114",
            "birthday": "1988-08-30T02:13:34.246Z",
            "comPhone": "021-88888888",
            "mobile": "13764648888",
            "email": "test@99bx.cn",
            "workDpt": "慧保科技",
            "address": "新金桥路58号",
            "occType": "01",
            "zipCode": "201300",
            "provinceCode": "300000",
            "cityCode": "3000001"
        },
        "insuredInfo": {
            "name": "托马斯",
            "gender": "1",
            "idType": "01",
            "idNo": "310225198808301114",
            "birthday": "1988-08-30T02:13:34.246Z",
            "comPhone": "021-88888888",
            "mobile": "13764648888",
            "email": "test@99bx.cn",
            "workDpt": "慧保科技",
            "address": "新金桥路58号",
            "occType": "01",
            "zipCode": "201300",
            "provinceCode": "300000",
            "cityCode": "3000001"
        },
        "beneInfo": {
            "name": "托马斯",
            "benAppRel": "本人",
            "gender": "1",
            "idType": "01",	
            "idNo": "310225198808301114",
            "birthday": "1988-08-30T02:13:34.246Z"
        },
        "insTgtInfo": {
            "address": "新金桥路58号",
            "tgtAddr": "九间堂",
            "housetype": "别墅",
            "houseAge": "9",
            "housePrice": 90000000,
            "licenseNo": "A1234",
            "engineNo": "8892384",
            "frameNo": "FM932492",
            "seatCount": "5"
        }
    }
}
```

**response part:**

NAME|TYPE|DESCRIPTION|REMARK
-|-
**data**|Json|投保单对象|同request

**response example:**
```json
{	"resDate":"2016-08-09T10:22:17+08:00",
	"code":"000",
	"msg":"sucess",
	"data":{
		"__v":0,
		"updatedAt":"2016-08-09T02:22:17.180Z",
		"updatedBy":"system",
		"createdBy":"system",
		"handlerCode":"system",
		"agentId":"5456027b0903dfd84169c124",
		"branch":"HB",
		"productCode":"TEST0001",
		"_id":"57a93e599f24dd5ad2ff7472",
		"createdAt":"2016-08-09T02:22:17.180Z",
		"asyncResultMsg":"0",
		"asyncStatus":"0",
		"insTgtInfo":{
			"address":"新金桥路58号",
			"tgtAddr":"九间堂",
			"housetype":"别墅",
			"houseAge":9,"housePrice":90000000,"licenseNo":"A1234",
			"engineNo":"8892384",
			"frameNo":"FM932492",
			"seatCount":5
		},
		"beneInfo":{
			"name":"托马斯",
			"benAppRel":"本人",
			"gender":"1",
			"idType":"01",
			"idNo":"310225198808301114",
			"birthday":"1988-08-30T02:13:34.246Z"
		},
		"insuredInfo":{
			"name":"托马斯",
			"gender":"1",
			"idType":"01",
			"idNo":"310225198808301114",
			"birthday":"1988-08-30T02:13:34.246Z",
			"comPhone":"021-88888888",
			"mobile":"13764648888",
			"email":"test@99bx.cn",
			"address":"新金桥路58号",
			"occType":"01",
			"zipCode":"201300",
			"provinceCode":"300000",
			"cityCode":"3000001"
		},
		"appliInfo":{
			"name":"托马斯",
			"gender":"1",
			"idType":"01",
			"idNo":"310225198808301114",
			"birthday":"1988-08-30T02:13:34.246Z",
			"comPhone":"021-88888888",
			"mobile":"13764648888",
			"email":"test@99bx.cn",
			"workDpt":"慧保科技",
			"address":"新金桥路58号",
			"occType":"01",
			"zipCode":"201300",
			"provinceCode":"300000",
			"cityCode":"3000001"
		},
		"mainInfo":{
			"cityName":"上海市",
			"provinceName":"上海市",
			"provinceCode":"300000",
			"cityCode":"300001",
			"startDate":"2016-08-08T02:13:34.246Z",
			"endDate":"2016-08-19T02:13:34.246Z",
			"benType":"2",
			"isaFlag":"0",
			"underwriteInd":"0",
			"inputDate":"2016-08-09T02:22:17.180Z"
		},
		"source":"04"
	}
}
```
**curl test:**
```bash
curl -X POST -H "Content-Type: application/json" -d @test/json/proposal.json http://127.0.0.1:8866/api/order/57a7eacebb8ea46a84ae3dba/proposal
```

---
