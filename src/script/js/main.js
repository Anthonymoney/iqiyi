//展开收缩
; (function () {
    class scale {
        constructor() {
            this.scaleBtn = $('.fold');
            this.small = $('.small .small-a div');
            this.big = $('.big .big-a div');
            this.flag = true;
        }
        init() {
            this.unfold();
        }

        unfold() {
            var _this = this;
            this.scaleBtn.on('click', function () {
                //展开
                if (_this.flag == true) {
                    _this.small.hide()
                    _this.big.stop().animate({
                        height: 400
                    }, 200).show();
                    _this.scaleBtn.html('收起').addClass('fold-arrow');
                    _this.flag = false;
                    //收起
                } else if (_this.flag == false) {
                    _this.big.stop().animate({
                        height: 0
                    }, 200);
                    _this.small.show();
                    _this.scaleBtn.html('展开').removeClass('fold-arrow');
                    _this.flag = true;
                }
            });
        }
    }
    new scale().init();
})();


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
                        console.log(data)
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

//每日精选数据拼接
; (function () {
    class dataSplicing {
        constructor(){
            this.ulproductlist=$('ul-productlist');
        }

        init(){
           
           $.ajax({
               type: "method",
               url: "http://10.31.163.23/iqiyi/php/getpicurl.php",
               dataType: "json",
               success: function (data) {
                   //console.log(data);
                   var result=data;
                   var str='';
                   $.each(result,function(index,value){
                       //console.log(value);
                       str+=`<li>
                       <div>
                            <a href="details.html?sid=${value.sid}" target='blank'>
                            <img src="${value.url}" width='140' height='140' data-original="${value.url}"> 
                            </a>
                            <div>
                            <p class="title">${value.title}</p>
                            <p class="sbutitle">
                                <span>
                                    <em>4K新品</em>
                                </span>
                                人工智能投屏看电视
                            </p>
                            <p class="price">
                                <span>
                                    ¥${value.price}
                                </span>
                            </p>
                        </div>
                       </div>
                       </li>`      
                   })
                   $('.ul-productlist').html(str); 
                   $('.ul-productlist img').lazyload({
                        effect: "fadeIn"
                   })
               }
           });
        }


    }

    new dataSplicing().init();

})();

//banner
; (function () {
    class banner {
        constructor() {
            this.aLi = $('.circlelist li');
            this.Rbtn = $('.ban-right');
            this.Lbtn = $('.ban-left');
            this.oA = $('.banner-a');
            this.oBanner = $('.banner');
            this.num = 0;
            this.timer = null;
        }
        init() {
            this.circleswith();
            this.Lwith();
            this.Rswith();
            this.autoplay();
            this.controltimer();
        }

        //底部ol的li添加事件
        circleswith() {
            var _this = this;
            this.aLi.on('click', function () {
                _this.num = $(this).index();
                //console.log(_this.num);
                $(this).addClass('active').siblings().removeClass('active');
                //opacity设置再li上 通过a找父级li
                //      重复出现封装
                //    _this.oA.eq(_this.num).parent().animate({
                //         opacity:1
                //     },500).siblings().css({
                //         opacity:0
                //     })
                _this.picswith();
            })

        }

        picswith() {
            this.oA.eq(this.num).parent().stop().animate({
                opacity: 1
            }, 500).siblings().css({
                opacity: 0
            })
        }

        Rswith() {
            var _this = this;
            this.Rbtn.on('click', function () {
                //封装 
                //   _this.num++;
                //   if(_this.num>4){
                //       _this.num=0;
                //   }
                //   _this.picswith();
                //   _this.aLi.eq(_this.num).addClass('active').siblings().removeClass('active');
                _this.Rclick();
            })
        }

        Rclick() {
            this.num++;
            if (this.num > 4) {
                this.num = 0;
            }
            this.picswith();
            this.aLi.eq(this.num).addClass('active').siblings().removeClass('active');
        }

        Lwith() {
            var _this = this;
            this.Lbtn.on('click', function () {
                _this.num--;
                if (_this.num < 0) {
                    _this.num = 4;
                }
                _this.picswith();
                _this.aLi.eq(_this.num).addClass('active').siblings().removeClass('active');

            })
        }

        autoplay() {
            var _this = this;
            this.timer = setInterval(function () {
                _this.Rclick();
            }, 2000)
        }

        controltimer() {
            var _this = this;
            this.oBanner.hover(function () {
                // over
                clearTimeout(_this.timer);

            }, function () {
                // out
                _this.timer = setInterval(function () {
                    _this.Rclick();
                }, 2000)
            }
            );
        }

    }
    new banner().init();
})();


//注册后显示用户名
;(function(){
    class showname{
        constructor(){
            this.namebox=$('.top-nav-left .login-name');
            this.exit=$('.top-nav-left .exit')
            this.login=$('.top-nav-left .login');
            this.regist=$('.top-nav-left .regist');
        }
        init(){
           this.nameshow();
           this.namehidden();
        }

        nameshow(){
            if($.cookie('name')){
                this.namebox.css({
                    display:"block",
                    width:100
                }).html('欢迎'+$.cookie('name'));
                this.exit.css('display','block');
                this.login.css('display','none');
                this.regist.css('display','none');
            }
        }

        namehidden(){
            var _this=this;
            this.exit.on('click',function(){
                $.cookie('name',name, { expires: -1 });
                if(!$.cookie('name')){
                    _this.namebox.css('display','none');
                    _this.exit.css('display','none');
                    _this.login.css('display','block');
                    _this.regist.css('display','block');
                }
            })
        }
    }
  new  showname().init();
})();