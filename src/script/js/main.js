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
;(function(){
    class register{
        constructor(){
            this.registerBox=$('.register-box');
            this.registerBtn=$('.login-regist .regist');
            this.mask = $('.mask');
            this.closeBtn=$('.register-close');
        }
        init(){
            this.show();
            this.close();
        }
        show(){
            
            var _this = this;
            this.registerBtn.on('click', function () {
                _this.registerBox.show();
                _this.mask.show().css({
                    height: $('body').height(),
                })
            });
        }

        close(){
            var _this = this;
            this.closeBtn.on('click', function () {
                _this.registerBox.hide();
                _this.mask.hide();
            })
        }
    }

    new  register().init();
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