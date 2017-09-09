if (!window.localStorage.getItem("ljposition")) {
    var state = -1;

    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB',

        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
        var str = ['定位成功'];
        str.push('经度：' + data.position.getLng());
        str.push('纬度：' + data.position.getLat());
        str.push('精度：' + data.accuracy + ' 米');
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        CityId = data.addressComponent.adcode;
        //   document.getElementById('tip').innerHTML = str.join('<br>');
        //console.log(data);
        lnglatXY = [data.position.getLng(), data.position.getLat()];
        console.log(lnglatXY);
        getCity();
        regeocoder();
    }
    //解析定位错误信息
    function onError(data) {
        state = 1;
    }
    //console.log(lnglatXY);
    //已知点坐标
    function regeocoder() { //逆地理编码
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                getCity(result);
            }
        });
        var marker = new AMap.Marker({ //加点
            map: map,
            position: lnglatXY
        });
        map.setFitView();
    }
    /* function geocoder_CallBack(data) {
         var address = data.regeocode.formattedAddress; //返回地址描述
         //console.log(address);
         console.log(data.regeocode.addressComponent.city);
         console.log(data.regeocode.addressComponent);
         //document.getElementById("result").innerHTML = address;
     }*/
    function getCity() {
        map.getCity(function(data) {
            if (data['province'] && typeof data['province'] === 'string') {
                //document.getElementById('info').innerHTML = '城市：' + (data['city'] || data['province']);
                console.log('城市：' + (data['city'] || data['province']));
                if (City == "") {

                    if (data['city'] != "") {
                        City = data['city'];
                    } else {
                        City = data['province'];
                    }

                }
                state = 0;
            }
        });
    }
}