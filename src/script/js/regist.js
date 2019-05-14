;(function(){
    class register{
        constructor(){
            this.inptarr=$('.register-box input');
            this.error=$('.register-box .error');
            this.flag1=true;
            this.flag2=true;
            this.flag3=true;
        }
        init(){
            this.name();
            this.password();
            this.passwordagain();
            this.submits();
        }
        name(){
            var _this=this;
            this.inptarr.eq(0).on('blur',function(){
                if($(this).val()!=''){
                    var reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
                    if(reg.test($(this).val())){
                        //lable不能用val设置内容
                        _this.error.eq(0).html('用户名可用');
                        _this.error.eq(0).css("color","green");
                        _this.flag1=true;
                        //注册时时检测用户名是否重复
                        $.ajax({
                            type: "post",
                            url: "http://10.31.163.23/iqiyi/php/regist.php",
                            data:{
                                username: _this.inptarr.eq(0).val()
                            },
                            success:function(data){
                                console.log(data);
                                if(data==0){
                                    _this.error.eq(0).html('用户名已存在');
                                    _this.error.eq(0).css("color","red");
                                    _this.flag1=false;
                                   
                                }else{
                                    _this.error.eq(0).html('用户名可用');
                                    _this.error.eq(0).css("color","green");
                                    _this.flag1=true;
                                }
                            }  
                        })
                    }else{
                        _this.error.eq(0).html('用户名格式有误');
                        _this.error.eq(0).css('color','red');
                        _this.flag1=false;
                    }
                }else{
                    _this.error.eq(0).html('用户名不能为空');
                    _this.error.eq(0).css('color','red');
                    _this.flag1=false;
                }


                

            })
        }

        password(){
             var _this=this;
            this.inptarr.eq(1).on('blur',function(){
                if($(this).val()!=''){
                    var reg=/^\w{6,20}$/
                    if(reg.test($(this).val())){
                        //lable不能用val设置内容
                        _this.error.eq(1).html('密码可用');
                        _this.error.eq(1).css("color","green");
                        _this.flag2=true;
                    }else{
                        _this.error.eq(1).html('密码长度有误');
                        _this.error.eq(1).css('color','red');
                        _this.flag2=false;
                    }
                }else{
                    _this.error.eq(1).html('密码不能为空');
                    _this.error.eq(1).css('color','red');
                    _this.flag2=false;
                }
            })
        }

       passwordagain(){
        var _this=this;
        this.inptarr.eq(2).on('blur',function(){
            if($(this).val()!=''){
                if($(this).val()==_this.inptarr.eq(1).val()){
                    _this.error.eq(2).html('密码可用');
                    _this.error.eq(2).css("color","green");
                    _this.flag3=true;
                }else{
                    _this.error.eq(2).html('密码与第一次不符');
                    _this.error.eq(2).css('color','red');
                    _this.flag3=false;
                }
            }else{
                _this.error.eq(2).html('密码不能为空');
                _this.error.eq(2).css('color','red');
                _this.flag3=false;
            }
        })
        }

        submits(){
            var _this=this;
            this.inptarr.eq(3).on('click',function(){
                if( _this.inptarr.eq(0).val()==''){
                    _this.error.eq(0).html('用户名不能为空');
                    _this.error.eq(0).css('color','red');
                    _this.flag1=false;
                }
                if( _this.inptarr.eq(1).val()==''){
                    _this.error.eq(1).html('密码不能为空');
                    _this.error.eq(1).css('color','red');
                    _this.flag2=false;
                }
                if( _this.inptarr.eq(2).val()==''){
                    _this.error.eq(2).html('密码不能为空');
                    _this.error.eq(2).css('color','red');
                    _this.flag3=false;
                }
                if(_this.flag1==false && _this.flag2==false && _this.flag3==false){
                    return false;
                }else{
                    $.cookie('name',_this.inptarr.eq(0).val(), { expires: 7 });
                }
            })
        }

    }
    new register().init();
})();