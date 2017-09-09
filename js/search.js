/**
 * New node file
 */
window.onload = function() {

    //城市列表

    function List(opts) {
        this.wrap = opts.dom || null;
        this.side = opts.side || null;
        this.hot = opts.hot || null;
        this.btn = opts.btn;
        this.data = opts.data;
        this.init();
    }

    List.prototype.init = function() {
        this.len = this.data.length;
        this.H = this.H();
        this.renderDOM(true);
        this.Move();
        this.Search();
        this.tab();
        this.click();
    };

    List.prototype.renderDOM = function(btn) {
        var arrFirstLetterR = []; //首字母数组（有重复 临时用）
        var arrFirstLetterS = []; //首字母数组（无重复 临时用）
        var arrWorldS = ['亚洲', '欧洲', '大洋洲', '北美洲', '南美洲', '非洲', '南极洲']; //国外洲数组（汉字 无重复 临时用)
        var arrWorldSC = []; //国外洲数组（首字母 无重复 临时用)
        var newArrFirstLetterS = []; //去掉无效项的首字母数组（无重复 临时用）
        var jsonFirstLetterS = {}; //去掉重复后的首字母json对象（ 临时用）
        this.arrCharLocal = [];
        this.arrCharWorld = [];
        this.arrCharWorldC = [];
        this.iBtn = btn;

        this.data.forEach(function(item, index) {
            if (item.Type == 1) {
                arrFirstLetterR.push(item.FirstLetter);
            }
        });


        for (var i = 0; i < arrFirstLetterR.length; i++) { //去重复
            if (!jsonFirstLetterS[arrFirstLetterR[i]]) {
                jsonFirstLetterS[arrFirstLetterR[i]] = 'a';
            }
        }

        for (var name in jsonFirstLetterS) { //对象转变数组
            arrFirstLetterS.push(name);
        }

        for (var i = 0; i < arrFirstLetterS.length - 1; i++) { //去掉最后一个无用项
            newArrFirstLetterS.push(arrFirstLetterS[i]);
        }

        newArrFirstLetterS.sort(); //首字母排序

        for (var j = 0; j < newArrFirstLetterS.length; j++) { //重构数据结构（国内）
            var data = [];
            var tempJson = {};
            var imgData = [];
            var cityIdData = [];
            for (var i = 0; i < this.len; i++) {
                //国内
                if ((City[i].Type == 1) && (City[i].FirstLetter == newArrFirstLetterS[j])) {
                    data.push(City[i].Name);
                    imgData.push(City[i].ImgUrl);
                    cityIdData.push(City[i].Id);
                }
            }
            tempJson.title = newArrFirstLetterS[j];
            tempJson.data = data;
            tempJson.imgData = imgData;
            tempJson.CityIds = cityIdData;
            this.arrCharLocal.push(tempJson);
        }

        for (var j = 0; j < newArrFirstLetterS.length; j++) { //重构数据结构（国外，此处数据仅供搜索用）
            var data = [];
            var tempJson = {};
            var imgData = [];
            var cityIdData = [];
            for (var i = 0; i < this.len; i++) {
                //国外
                if ((City[i].Type == 2) && (City[i].FirstLetter == newArrFirstLetterS[j])) {
                    data.push(City[i].Name);
                    imgData.push(City[i].ImgUrl);
                    cityIdData.push(City[i].Id);
                }
            }
            tempJson.title = newArrFirstLetterS[j];
            tempJson.data = data;
            tempJson.imgData = imgData;
            tempJson.CityIds = cityIdData;
            this.arrCharWorldC.push(tempJson);
        }

        var bmz = [];
        var nmz = [];
        var oz = [];
        var yz = [];
        var fz = [];
        var dyz = [];
        var njz = [];

        var bmzImg = [];
        var nmzImg = [];
        var ozImg = [];
        var yzImg = [];
        var fzImg = [];
        var dyzImg = [];
        var njzImg = [];

        var bmzCid = [];
        var nmzCid = [];
        var ozCid = [];
        var yzCid = [];
        var fzCid = [];
        var dyzCid = [];
        var njzCid = [];
        var allArr = [yz, oz, dyz, bmz, nmz, fz, njz];
        var allArrImg = [yzImg, ozImg, dyzImg, bmzImg, nmzImg, fzImg, njzImg];
        var allArrCityId = [yzCid, ozCid, dyzCid, bmzCid, nmzCid, fzCid, njzCid];
        for (var i = 0; i < this.len; i++) {
            //国外

            var tempJson = {};
            if (City[i].Type == 2) {
                switch (City[i].Pid) {
                    case 2000002: //北美洲
                        bmz.push(City[i].Name);
                        bmzImg.push(City[i].ImgUrl);
                        bmzCid.push(City[i].Id);
                        break;
                    case 2000003: //南美洲
                        nmz.push(City[i].Name);
                        nmzImg.push(City[i].ImgUrl);
                        nmzCid.push(City[i].Id);
                        break;
                    case 2000005: //欧洲
                        oz.push(City[i].Name);
                        ozImg.push(City[i].ImgUrl);
                        ozCid.push(City[i].Id);
                        break;
                    case 2000001: //亚洲
                        yz.push(City[i].Name);
                        yzImg.push(City[i].ImgUrl);
                        yzCid.push(City[i].Id);
                        break;
                    case 2000006: //非洲
                        fz.push(City[i].Name);
                        fzImg.push(City[i].ImgUrl);
                        fzCid.push(City[i].Id);
                        break;
                    case 2000004: //大洋洲
                        dyz.push(City[i].Name);
                        dyzImg.push(City[i].ImgUrl);
                        dyzCid.push(City[i].Id);
                        break;
                }
            }

        }

        for (var j = 0; j < arrWorldS.length; j++) { //重构数据结构（国外）

            var data = [];
            var tempJson = {};
            switch (arrWorldS[j]) {
                case '亚洲':
                    arrWorldSC.push('yz');
                    data = yz;
                    dataImg = yzImg;
                    dataCid = yzCid;
                    break;
                case '北美洲':
                    arrWorldSC.push('bmz');
                    data = bmz;
                    dataImg = bmzImg;
                    dataCid = bmzCid;
                    break;
                case '南美洲':
                    arrWorldSC.push('nmz');
                    data = nmz;
                    dataImg = nmzImg;
                    dataCid = nmzCid;
                    break;
                case '欧洲':
                    arrWorldSC.push('oz');
                    data = oz;
                    dataImg = ozImg;
                    dataCid = ozCid;
                    break;
                case '大洋洲':
                    arrWorldSC.push('dyz');
                    data = dyz;
                    dataImg = dyzImg;
                    dataCid = dyzCid;
                    break;
                case '非洲':
                    arrWorldSC.push('fz');
                    data = fz;
                    dataImg = fzImg;
                    dataCid = fzCid;
                    break;
                case '南极洲':
                    arrWorldSC.push('njz');
                    data = njz;
                    dataImg = njzImg;
                    dataCid = njzCid;
                    break;
            }

            tempJson.title = arrWorldSC[j];
            tempJson.place = arrWorldS[j];
            tempJson.data = data;
            tempJson.dataImg = dataImg;
            tempJson.CityIds = dataCid;
            this.arrCharWorld.push(tempJson);
        }

        for (var i = 0; i < this.arrCharWorld.length; i++) {
            this.arrCharWorld[i].data = allArr[i];
        }

        //开始布局

        this.wrap.innerHTML = '';
        this.side.innerHTML = '';

        var _this = this;
        var oH2 = document.querySelector('.weChat-hotCity h2');
        if (this.iBtn) { //如果是国内

            //热门
            var str = '';
            hotCity.forEach(function(item, index) {
                if (item.Type == 1) {
                    str += '<span data-id="' + item.Id + '">' + item.Name + '</span>'
                }
            });

            this.hot.innerHTML = str;
            oH2.innerHTML = '热门城市';
            //列表
            var charArr = ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

            charArr.forEach(function(item, index) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = item;
                a.href = '#';

                if (index == 0) {
                    a.setAttribute('data-str', 'hot');
                } else {
                    a.setAttribute('data-str', item);
                }
                li.appendChild(a);
                _this.side.appendChild(li);
            });

            this.arrCharLocal.forEach(function(item, index) {
                var li = document.createElement('li');
                li.setAttribute('data-id', item.title);
                li.className = 'indexChar';
                li.id = item.title;
                li.innerHTML = item.title;
                _this.wrap.appendChild(li);
                item.data.forEach(function(item2, index) {
                    var li1 = document.createElement('li');
                    li1.className = 'place-pub-style city';
                    li1.innerHTML = '<a href="/index.html?City=' + escape(item2) + '&CityId=' + item.CityIds[index] + '"><img src=' + item.imgData[index] + '><p>' + item2 + '</p></a>';
                    _this.wrap.appendChild(li1);
                })

            });
        } else if (!this.iBtn) { //如果是国外

            //热门
            var str = '';
            hotCity.forEach(function(item, index) {
                if (item.Type == 2) {
                    str += '<span data-id="' + item.Id + '">' + item.Name + '</span>'
                }
            });

            this.hot.innerHTML = str;
            oH2.innerHTML = '热门国家';

            this.side.parentNode.className = 'guide-index active';
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = '热门';
            a.href = '#';
            a.setAttribute('data-str', 'hot');
            li.appendChild(a);
            this.side.appendChild(li);

            this.arrCharWorld.forEach(function(item, index) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.innerHTML = item.place;
                a.href = '#';
                a.setAttribute('data-str', item.title);

                if (index == 0) {
                    li.style.marginTop = '.3rem';
                }

                li.appendChild(a);
                _this.side.appendChild(li);

                var li = document.createElement('li');
                li.setAttribute('data-id', item.title);
                li.className = 'indexChar';
                li.id = item.title;
                li.innerHTML = item.place;
                _this.wrap.appendChild(li);
                item.data.forEach(function(item2, index) {
                    var li1 = document.createElement('li');
                    li1.className = 'place-pub-style city';
                    li1.innerHTML = '<a href="/index.html?City=' + escape(item2) + '&CityId=' + item.CityIds[index] + '"><img src=' + item.dataImg[index] + '><p>' + item2 + '</p></a>';
                    _this.wrap.appendChild(li1);
                })

            });
        }

        /*var aA=document.querySelectorAll('.guide-index a');
        var h1=$('.weChat-search').height();
        var h2=$('.share-code').height();
        var iH=window.innerHeight-h1*2-(h1-h1/4)-h2;
	
        console.log(iH);
	
        for(var i=1; i<aA.length; i++){
        	(function(index){console.log(iH);
        		aA[index].style.height=iH/(aA.length-1)+'px';
        	})(i);
        }*/

    };

    List.prototype.H = function() {
        var h1 = $('.weChat-search').height();
        var h2 = $('.share-code').height();
        var iH = window.innerHeight - h1 * 2 - (h1 - h1 / 4) - h2;
        return iH;
    };

    List.prototype.Move = function() {
        var aA = document.querySelectorAll('.guide-index a');
        var oH = document.querySelectorAll('.guide-index a')[0];
        var oSpan = document.querySelector('.tips-index');
        var oWrap = document.querySelector('.wrap');
        var oAside = document.querySelector('aside');
        var iL = oAside.getBoundingClientRect().left; //aside距离左边的距离
        var iT = $(oAside).offset().top;
        //	var h1=$('.weChat-search').height();
        //	var h2=$('.share-code').height();
        //	var iH=window.innerHeight-h1*2-(h1-h1/4)-h2;
        var iH = this.H;
        var timer = null;
        var num = 0;


        //滑动主体列表时圆圈立刻消失
        oWrap.addEventListener('touchmove', function() {
            oSpan.style.display = 'none';
        }, false);

        //点击H2定位
        oH.addEventListener('click', function() {
            oWrap.scrollTop = 0;
        }, false);

        //滑动侧边栏时的定位
        document.addEventListener('touchmove', function(ev) {
            var oTouch = ev.changedTouches[0];
            var obj = document.elementFromPoint(oTouch.pageX, oTouch.pageY);

            if (obj.tagName != 'A') return; //如果不是在a标签上滑动时则返回

            var str = obj.getAttribute('data-str');
            var char = obj.innerText;
            var el = document.querySelector('[data-id=' + str + ']');

            if (!el) return; //如果不是列表主体的元素则返回

            oSpan.style.display = 'block';
            oSpan.style.opacity = 1;
            oSpan.innerHTML = char;

            for (var i = 0; i < aA.length; i++) {
                aA[i].className = '';
            }

            obj.className = 'active';
            oWrap.scrollTop = el.offsetTop;
            ev.preventDefault();

        }, false);

        //手指离开屏幕后圆圈动画消失
        document.addEventListener('touchend', function() {
            for (var i = 0; i < aA.length; i++) {
                aA[i].className = '';
            }

            clearTimeout(timer);
            timer = setTimeout(function() {
                oSpan.style.opacity = 0;
                oSpan.addEventListener('webkitTransition', function() {
                    oSpan.style.display = 'none';
                }, false);
            }, 1000);
        });

        //点击侧边栏时的定位
        for (var i = 1; i < aA.length; i++) {
            (function(index) {
                aA[index].style.height = iH / (aA.length - 1) + 'px';
                aA[index].addEventListener('click', function() {
                    oSpan.style.display = 'block';
                    oSpan.style.opacity = 1;
                    oSpan.innerHTML = this.innerHTML;

                    for (var i = 0; i < aA.length; i++) {
                        aA[i].className = '';
                    }

                    this.className = 'active';
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        oSpan.style.opacity = 0;
                        oSpan.addEventListener('webkitTransitionEnd', function() {
                            oSpan.style.display = 'none';
                        }, false);
                    }, 1000);

                    var str = this.getAttribute('data-str');
                    var el = document.querySelector('[data-id=' + str + ']');

                    oWrap.scrollTop = el.offsetTop;
                }, false);
            })(i);
        }
    };

    List.prototype.Search = function() {
        var oHot = document.querySelector('.weChat-hotCity');
        var oS = document.querySelector('.weChat-search-scence input');
        var oSide = document.querySelector('.guide-index');
        var _this = this;

        oS.addEventListener('input', function() {
            var resultArr = [];
            var resultArrImg = [];
            var resultCityIds = [];
            var val = this.value;
            oHot.style.display = 'none';
            _this.wrap.innerHTML = '';

            oSide.style.display = 'none';

            if (val.length == 0) {
                oHot.style.display = 'block';
                _this.renderDOM(_this.iBtn);
                _this.Move();
                oSide.style.display = 'block';
            }


            if (_this.iBtn) { //国内
                if (StringType(val)) { //输入英文

                    _this.arrCharLocal.forEach(function(item, index) {
                        if (val.charAt(0).toUpperCase() == item.title) {

                            item.data.forEach(function(item2, index) {
                                var li1 = document.createElement('li');
                                li1.className = 'place-pub-style city';
                                li1.innerHTML = '<a href="/index.html?City=' + escape(item2) + '&CityId=' + item.CityIds[index] + '"><img src=' + item.imgData[index] + '><p>' + item2 + '</p></a>';
                                _this.wrap.appendChild(li1);
                            })
                        }
                    });

                } else { //输入中文
                    _this.arrCharLocal.forEach(function(item, index) {

                        var make = makePy(val.charAt(0))[0].toUpperCase();

                        if (val.charAt(0) == '长') {
                            make = 'C';
                        }

                        if (make == item.title) {
                            item.data.forEach(function(item2, index2) {
                                var re = new RegExp(val);

                                if (item2.search(re) != -1) {
                                    resultArr.push(item2);
                                    resultArrImg.push(item.imgData[index2]);
                                    resultCityIds.push(item.CityIds[index2]);
                                }
                            });
                        }
                    });
                    resultArr.forEach(function(item, index) {
                        var li1 = document.createElement('li');
                        li1.className = 'place-pub-style city';
                        li1.innerHTML = '<a href="/index.html?City=' + escape(item) + '&CityId=' + resultCityIds[index] + '"><img src=' + resultArrImg[index] + '><p>' + item + '</p></a>';
                        _this.wrap.appendChild(li1);
                    });
                }
            } else if (!_this.iBtn) { //国外
                if (StringType(val)) { //输入英文

                    _this.arrCharWorldC.forEach(function(item, index) {
                        if (val.charAt(0).toUpperCase() == item.title) {

                            item.data.forEach(function(item2, index) {
                                var li1 = document.createElement('li');
                                li1.className = 'place-pub-style city';
                                li1.innerHTML = '<a href="/index.html?City=' + escape(item2) + '&CityId=' + item.CityIds[index] + '"><img src=' + item.imgData[index] + '><p>' + item2 + '</p></a>';
                                _this.wrap.appendChild(li1);
                            })
                        }
                    });

                } else { //输入中文
                    _this.arrCharWorldC.forEach(function(item, index) {

                        var make = makePy(val.charAt(0))[0].toUpperCase();

                        if (val.charAt(0) == '朝') {
                            make = 'C';
                        }

                        if (make == item.title) {
                            item.data.forEach(function(item2, index2) {
                                var re = new RegExp(val);

                                if (item2.search(re) != -1) {
                                    resultArr.push(item2);
                                    resultArrImg.push(item.imgData[index2]);
                                    resultCityIds.push(item.CityIds[index2]);
                                }
                            });
                        }
                    });
                    resultArr.forEach(function(item, index) {
                        var li1 = document.createElement('li');
                        li1.className = 'place-pub-style city';
                        li1.innerHTML = '<a href="/index.html?City=' + escape(item) + '&CityId=' + resultCityIds[index] + '"><img src=' + resultArrImg[index] + '><p>' + item + '</p></a>';
                        _this.wrap.appendChild(li1);
                    });
                }
            }
            _this.click();
        });
    };

    List.prototype.tab = function() {
        var _this = this;
        window.btn = true;
        var oS = document.querySelector('.weChat-search-scence input');
        var aLi = document.querySelectorAll('.weChat-sort-rule li');
        var oI = document.querySelector('.weChat-sort-rule i');
        var iW = oI.offsetWidth;
        var num = 0;

        for (var i = 0; i < aLi.length; i++) {
            (function(index) {
                aLi[index].addEventListener('click', function() {
                    oS.value = '';
                    aLi[num].className = '';
                    num = index;
                    this.className = 'active';
                    oI.style.left = num * iW + 'px';

                    if (index == 0) {
                        oS.setAttribute('placeholder', '请输入国内城市');
                        _this.iBtn = true;
                        _this.renderDOM(_this.iBtn);
                    } else if (index == 1) {
                        oS.setAttribute('placeholder', '请输入海外国家');
                        _this.iBtn = false;
                        _this.renderDOM(_this.iBtn);
                    }
                    _this.Move();
                    _this.click();
                }, false);
            })(i);
        }
    };

    List.prototype.click = function() {
        var aLi = document.querySelectorAll('.city-list-wrap li');
        var aSpan = document.querySelectorAll('.hotCity-wrap span');

        for (var i = 0; i < aLi.length; i++) {
            (function(index) {
                aLi[index].addEventListener('tap', function() {
                    //alert(this.querySelector('p').innerHTML);
                    var id = this.getAttribute("data-id");
                    window.location.href = "/index.html?City=" + escape(this.querySelector('p').innerHTML) + "&CityId=" + id;
                    //console.log(this.querySelector('p').innerHTML);
                }, false);
            })(i);
        }

        for (var i = 0; i < aSpan.length; i++) {
            (function(index) {
                aSpan[index].addEventListener('tap', function() {
                    //alert(this.innerHTML);
                    var id = this.getAttribute("data-id");
                    window.location.href = "/index.html?City=" + escape(this.innerHTML) + "&CityId=" + id;
                    //	console.log(this.innerHTML);
                }, false);
            })(i);
        }

        //	aLi.forEach(function(item,index){
        //		item.addEventListener('tap',function(){
        //			 window.location.href = "/index.html?City=" + escape(this.innerHTML);
        //			console.log(this.querySelector('p').innerHTML);
        //		},false);
        //	});
        //	
        //	aSpan.forEach(function(item,index){
        //		item.addEventListener('tap',function(){
        //			alert(this.innerHTML);
        //			console.log(this.innerHTML);
        //		},false);
        //	});
    };

    //判断输入的是字母或是汉字
    function StringType(str) {
        var regEn = new RegExp('[A-Za-z]');
        var regChina = new RegExp('[\u4e00-\u9fa5]');

        if (regEn.test(str)) {
            return 1; //英文
        } else if (regChina.test(str)) {
            return 0; //汉字
        }
    }

    //城市地区列表

    var a = new List({
        dom: document.querySelector('.city-list-wrap'),
        side: document.querySelector('.city-list-aside'),
        hot: document.querySelector('.hotCity-wrap'),
        btn: true,
        data: City
    });

};