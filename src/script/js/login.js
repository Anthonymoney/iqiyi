;(function(){
    class login{
        constructor(){
            this.inputarr=$('.login-box input');
            this.infotip=$('.login-box .btn span');
        }

        init(){
            this.submit();
        }
        submit(){
            var _this=this;
            this.inputarr.eq(2).on('click',function(){
                    $.ajax({
                        type: "post",
                        url: "http://10.31.163.23/iqiyi/php/login.php",
                        data: {
                            username:_this.inputarr.eq(0).val(),
						    password:_this.inputarr.eq(1).val()
                        },
                        success: function (data) {
                            if(!data){
                                alert('用户名或者密码错误');
                                _this.inputarr.eq(1).val('');
                            }else{
                                $.cookie('name',_this.inputarr.eq(0).val(), { expires: 7 });
                                location.href='http://10.31.163.23/iqiyi/src/index11.html';
                                //登入成功cooki加入用户名
                               
                            }
                        }
                    });
            })
        }
    }
    new login().init();
})();