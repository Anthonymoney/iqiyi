//login
; (function () {
    class login {
        constructor() {
            this.loginBtn = $('.login-regist .login');
            this.loginBox = $('.login-box');
            this.mask = $('.mask');
            this.closeBtn = $('.close');
        }
        init() {
            this.show();
            this.close();
        }
        show() {
            var _this = this;
            this.loginBtn.on('click', function () {
                _this.loginBox.show();
                _this.mask.show().css({
                    height: $('body').height(),
                })
            });
        }
        close() {
            var _this = this;
            this.closeBtn.on('click', function () {
                _this.loginBox.hide();
                _this.mask.hide();
            })
        }

    }
    new login().init();
})();


//register
; (function () {
    class register {
        constructor() {
            this.registerBox = $('.register-box');
            this.registerBtn = $('.login-regist .regist');
            this.mask = $('.mask');
            this.closeBtn = $('.register-close');
        }
        init() {
            this.show();
            this.close();
        }
        show() {

            var _this = this;
            this.registerBtn.on('click', function () {
                _this.registerBox.show();
                _this.mask.show().css({
                    height: $('body').height(),
                })
            });
        }

        close() {
            var _this = this;
            this.closeBtn.on('click', function () {
                _this.registerBox.hide();
                _this.mask.hide();
            })
        }
    }

    new register().init();
})();




//search
; (function () {
    class searh {
        constructor() {
            this.searchtext = $('.search-text');
            this.searhlist = $('.search-list')
        }
        init() {
            var _this = this;
            this.searchtext.on('input', function () {
                if (_this.searchtext.val() != '') {
                    _this.searhlist.show().css({
                        "z-index": 55
                    });
                } else {
                    _this.searhlist.hide()
                }
                $.ajax({
                    type: "method",
                    url: "https://suggest.taobao.com/sug?code=utf-8&q=" + _this.searchtext.val() + "&_ksTS=1557297648268_308",
                    dataType: "jsonp",
                    success: function (data) {
                        var result = data.result;
                        //console.log(data)
                        //console.log(result[0]);
                        var str = '';
                        $.each(result, function (index, value) {
                            str += `<li><a href='https://s.taobao.com/search?q=&im${value[0]}gfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306' target='blank'>${value[0]}</a></li>`
                        })
                        $('.search-list ul').html(str);
                        if (data.result[0] == null) {
                            $('.search-list').css({
                                borderBottom: 0
                            })
                        }
                    }
                })
            })

        }
    }
    new searh().init();

})();



//详情页数据拼接
; (function () {
    class detailSplicing {
        constructor() {
            this.spic = $('.spic img');
            this.sf = $('.sf');
            this.bpic = $('.bpic');
            this.list = $('#list ul');
            this.shoptitle = $('.shoptitle span');
            this.title = $('.shopdetails h3');
            this.price = $('.shopdetails .sp2');
            this.sid = location.search.split('=')[1];

        }
        init() {
            var _this = this;
            $.ajax({
                url: "http://10.31.163.23/iqiyi/php/returndetails.php",
                data: {
                    sid: this.sid
                },
                dataType: "json",
                success: function (data) {
                    var price = data.price;
                    var title = data.title;
                    //取对象里的listurl将字符串转数组在遍历
                    var result = data.listurl.split(',');
                    //console.log(result)
                    var str = '';
                    $.each(result, function (index, value) {
                        //给渲染的li加个类 帮助在放大镜中找到li元素
                        str += `<li class="getli">
                    <img src='${value}'>
                    </li>`
                    })
                    //将listurl里的第一条值给放大镜的小图和大图
                    _this.spic.attr("src", result[0]);
                    _this.bpic.attr("src", result[0]);

                    $('#list ul').html(str);
                    _this.title.html(title);
                    _this.price.html(price);
                    _this.shoptitle.html(title);
                }
            });
        }
    }
    new detailSplicing().init();
})();


//放大镜
; (function () {
    class magnifying {
        constructor() {
            this.container = $('.container');
            //取的是spic盒子，不能取小图 所有尺寸都是大图尺寸
            this.spic = $('.spic');
            this.simg = $('.spic img')
            this.sf = $('.sf');
            this.bf = $('.bf');
            this.bpic = $('.bpic');
            this.list = $('#list ul');
        }
        init() {
            var _this = this;
            this.spic.hover(function () {
                //鼠标经过小图
                //sf bf出现 按比例给sf赋值宽高
                _this.sf.css('display', 'block');
                _this.bf.css('display', 'block')
                _this.sf.width(_this.bf.width() * _this.spic.width() / _this.bpic.width());
                _this.sf.height(_this.bf.height() * _this.spic.height() / _this.bpic.height());
                _this.spicmousemove();
            }, function () {
                _this.spicmouseout();
            })
            this.changepic();
        }

        //鼠标在小图内移动
        spicmousemove() {
            var _this = this;
            this.spic.on('mousemove', function (ev) {
                var ev = ev || window.event;
                _this.sfmove(ev);
            })
        }

        //改变sf位置
        sfmove(ev) {
            var t = ev.pageY - this.container.offset().top - this.sf.height() / 2;
            var l = ev.pageX - this.container.offset().left - this.sf.width() / 2;
            var bili = this.bpic.width() / this.bf.width();
            if (l < 0) {
                l = 0;
            } else if (l > this.spic.width() - this.sf.width()) {
                l = this.spic.width() - this.sf.width();
            }
            if (t <= 0) {
                t = 0;
            } else if (t >= this.spic.height() - this.sf.height()) {
                t = this.spic.height() - this.sf.height();
            }
            this.sf.css({
                top: t,
                left: l
            })
            //大图等比列移动
            this.bpic.css({
                top: -t * bili,
                left: -l * bili
            })
        }

        //鼠标移除不可见
        spicmouseout() {
            this.sf.css('display', 'none');
            this.bf.css('display', 'none');
        }

        //改变图片
        changepic() {
            var _this = this;
            //jq的事件委托 给ul加上'.getli'
            this.list.on('click', '.getli', function () {
                _this.simg.attr('src', $(this).find('img').attr('src'));
            })
        }
    }
    new magnifying().init();
})();


//加入购物车
; (function () {
    class deltailscart {
        constructor() {
            this.joincart = $('.joincart');
            this.larrow = $('.l-arrow');
            this.rarrow = $('.r-arrow');
            this.input = $('.num');
            this.numberarr = [];
            this.sidarr = [];
            this.num = 1;
            this.localsid = location.search.split('=')[1];
        }
        init() {

            this.getcookie();
            this.addcart();
            this.add();
            this.even();

        }

        addcart() {
            var _this = this;
            this.joincart.on('click', function () {
                //将输入框里的值放入商品数量里
                 //input里的值是字符串
                _this.num = Number(_this.input.val());
              
                //cookie中的sid与number值一一对应 
                //先判断cookie里是否存在对应的sid，不存在就加入，存在就从cookie里拿出原来的值与当前的num相加在存入
                if (_this.sidarr.indexOf(_this.localsid) == -1) {
                    _this.sidarr.push(_this.localsid);
                    _this.numberarr.push(1);
                    $.cookie('shopnum', _this.numberarr, {expires:7});
                    $.cookie('sid', _this.sidarr, {expires:7});
                } else {
                    
                     //通过地址栏上sid返回cookie里的sidarr对应的索引，给numberarr数组使用
                     //利用indexof方法来返回一个索引
                    var newnum = Number(_this.numberarr[_this.sidarr.indexOf(_this.localsid)])
                    newnum +=_this.num;
                   
                    _this.numberarr[_this.sidarr.indexOf(_this.localsid)] = newnum;
                    $.cookie('shopnum', _this.numberarr, {expires:7});
                }

            })
        }



        add() {
            var _this = this;
            this.rarrow.on('click', function () {
                _this.num = _this.input.val();
                _this.num++;
                _this.input.val(_this.num);
            })
        }

        even() {
            var _this = this;
            this.larrow.on('click', function () {
                if (_this.input.val() > 1) {
                    _this.num = _this.input.val();
                    _this.num--;
                    _this.input.val(_this.num);
                }
            })
        }

        //页面一加载就判断是否存加入过cookie
        getcookie() {
            if ($.cookie('shopnum') && $.cookie('sid')) {
                
                this.numberarr = $.cookie('shopnum').split(',');
                this.sidarr = $.cookie('sid').split(',');
            } else {
                this.numberarr = [];
                this.sidarr = [];
            }
        }

    }

    new deltailscart().init();
})();

