/*
* 功 能：配置信息
*
* Ver    变更日期              负责人     变更内容
* ───────────────────────────────────
* V0.01  2016/02/29            付兴旺     初版
*
* Copyright (c) 2015 Yanjing Travel Corporation. All rights reserved.
*┌──────────────────────────────────┐
*│　此技术信息为本公司机密信息，未经本公司书面同意禁止向第三方披露．　│
*│　版权所有：燕京智汇（北京）国际旅行社有限公司　　　　　　　　　　　│
*└──────────────────────────────────┘
*/
var Hostpath = "http://localhost:63054";
String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

var YjlyHostPath = "{0}/Common/{1}.ashx?cmd={2}&param={3}";
var YjlyRequest = '{"cmd":"{0}","param":{1}}';
var YjlyRequestSign = '{"cmd":"VisitnetWork","param":{0},"version":"{1}","method":"{2}","type":"{3}","languageId":"{4}"}';
var YjlyRequestSignPage = '{"cmd":"VisitnetWork","param":{0},"version":"{1}","method":"{2}","type":"{3}","languageId":"{4}"}';
var Yjly_backstage = "{0}/Common/{1}.ashx?cmd={2}&param={3}&Sign={4}&Tag=10018";
//request param
function request(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
//参数加密
/* 使用说明
   YJLYJSONENCRY(jsonStr, function (data) {
    if(data!=-1){
        //签名成功
    }else{
        //签名失败
    }
   });
*/
function YJLYJSONENCRY(jsonStr, callback) {
    jsonStr = encodeURIComponent(jsonStr);
    var lhosturl = Hostpath + "/Common/JsonEncry.ashx"; //参数签名加密
    $.post(lhosturl, { cmd: "YjlyJsonEncry", param: jsonStr }).success(function (data) {
        var res = "";
        var JsonData = eval("(" + data + ")");
        if (JsonData.state == 0) {
            var result = eval("(" + JsonData.value + ")"); //返回的参数加密签名
            res = result;
        } else {
            alert(jsonData.msg);
            res = -1;
        }
        callback && callback(res);
    });
}
//长请求串提交
/* 使用说明
   YJLYLONGURLJSONP(longUrl,data, function (data) {
     //do something...
   });
*/
function YJLYLONGURLJSONP(longUrl, data, callback) {
    var lhosturl = Hostpath + "/Common/LongUrlJsonp.ashx"; //参数签名加密
    $.post(lhosturl, { LongUrl: longUrl, PostData: data }).success(function (data) {
        callback && callback(data);
    });
}

//查看用户是否被踢
/* 使用说明 将数据返回状态传入此方法
    if (!CHECKEDLOGIN(data,true))
       return;
*/
function ERRORSTATE(data, bool) {
    if (data.state == 6) {
        alert(data.msg);
        top.location.href = Hostpath;
    } else if (data.state == "6") {
        alert(data.msg);
        top.location.href = Hostpath;
    } else {
        if (bool) {//判断是否需要弹框
            alert(data.msg);
        }
    }
}