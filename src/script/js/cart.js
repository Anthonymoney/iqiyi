; (function () {
    class cart {
        constructor() {
            this.sidarr = [];
            this.numberarr = [];
        }
        init() {
            if ($.cookie('sid') && $.cookie('shopnum')) {
                this.sidarr = $.cookie('sid').split(',')
                this.numberarr = $.cookie('shopnum').split(',')
            }
            this.createpic();
            this.add();
            this.even();
            this.clickcheck();
            this.allcheck();
            this.delall();
            this.delsingle();
            this.sumnum();

        }


        //渲染数据
        createpic() {
            var _this = this;
            var $price = 0;

            $.each(this.sidarr, function (index, value) {
                $.ajax({
                    url: "http://10.31.163.23/iqiyi/php/returndetails.php",
                    data: {
                        sid: value
                    },
                    dataType: "json",
                    success: function (data) {
                        var $clonebox = $('.nonetr:hidden').clone(true, true);
                        $clonebox.find('.cartimg').attr('src', data.url);
                        //给图片添加sid 帮助后续通过每张图片的sid 将白改变后的num对应放入cookie里
                        $clonebox.find('.cartimg').attr('sid', data.sid);
                        $clonebox.find('.title-p').html(data.title);
                        $clonebox.find('.td-price').html(data.price);
                        $clonebox.find('.td-pay').html((data.price * _this.numberarr[index]).toFixed(2));
                        $clonebox.find('.num').html(_this.numberarr[index]);
                        $('.cart-main').append($clonebox);
                        $clonebox.css({ "display": "block" });
                        //页面一加载先计算一次总价  后续操作于此无关
                        $price += Number(($clonebox.find('.td-price').html() * $clonebox.find('.num').html()).toFixed(2));
                        $('.total-price').html($price);

                    
                     
                    }
                });
            })
        }

         //页面一加载 给顶部购物车数量赋值
         sumnum(){
             var sumnum=0;
             $.each(this.numberarr,function(index,value){
                sumnum+=parseInt(value);
             })
             $('.cartnum').html(sumnum);
         }


        //增加商品数量
        add() {
            var _this = this;
            $('.arrow-r').on('click', function () {
                var changenum = parseInt($(this).prev().html());
                changenum++;
                //console.log(typeof changenum);
                $(this).prev().html(changenum);
                //数量增加后，放入cokie的sidarr中
                var $index = _this.sidarr.indexOf($(this).parents('.nonetr').find('.cartimg').attr('sid'))
                _this.numberarr[$index] = changenum;
                _this.sumprice();
                $.cookie('shopnum', _this.numberarr, { expires: 7 });
                //数量增加后 实付款价格也重新计算
              var $price=Number($(this).parents('.nonetr').find('.td-price').html())
              $(this).parents('.nonetr').find('.td-pay').html(($price* changenum).toFixed(2));
            })
        }

        //减商品数量
        even() {
            var _this = this;
            $('.arrow-l').on('click', function () {
                var changenum = parseInt($(this).next().html());
                if (changenum > 1) {
                    changenum--;
                    $(this).next().html(changenum);
                    var $index = _this.sidarr.indexOf($(this).parents('.nonetr').find('.cartimg').attr('sid'))
                    _this.numberarr[$index] = changenum;
                     _this.sumprice();
                    $.cookie('shopnum', _this.numberarr, { expires: 7 });
                    //数量减少后 实付款价格也重新计算
              var $price=Number($(this).parents('.nonetr').find('.td-price').html())
              $(this).parents('.nonetr').find('.td-pay').html(($price* changenum).toFixed(2));
                }
            })
        }

        //计算总价格
        sumprice() {
            var $num = 0;
            var $price = 0;
            $('.nonetr:visible').each(function (i, val) {
                if ($(val).find('input').prop('checked')) {
                    //计算勾选的总价
                    // console.log($(val).find('.num').html());
                    $num += parseInt($(val).find('.num').html());
                    $price += Number(($(val).find('.td-price').html() * $(val).find('.num').html()).toFixed(2));
                    
                    //顶部给购物车赋值商品总数量
                    $('.cartnum').html($num);
                }
            })

            $('.total-price').html($price);
        }

        //点击复选框重新计算价格
        clickcheck() {
            var _this = this;
            $('.cart-main input').on('click', function () {
                 _this.sumprice();
            })
        }

        //全选与单选
        allcheck() {
            var _this=this;
            $('.th-info input').on('change', function () {
                if ($('.th-info input').prop('checked') == true) {
                    $('.nonetr:visible').find('input').prop('checked', true);
                }else {
                    $('.nonetr:visible').find('input').prop('checked', false);
                }
                 _this.sumprice();
               
            })
            
            // 不能选择可见的$('.nonetr:visible').find('input')，加不上事件
            $('.nonetr').find('input').on('change',function(){
                if( $('.nonetr:visible').find('input').length== $('.nonetr:visible').find('input:checked').length){
                    $('.th-info input').prop('checked',true)
                }else{
                    $('.th-info input').prop('checked',false);
                }
                 _this.sumprice();
            })

        }

       //删除全部
       delall(){
           var _this=this;
           $('.delall').on('click',function(){
               $('.nonetr:visible input:checked').each(function(i,val){
                    //取到对应图片sid从cookie里删除对应sid与number
                    //console.log( $(val).parents('.nonetr:visible').find('.cartimg').attr('sid'))
                    var index= $(val).parents('.nonetr:visible').find('.cartimg').attr('sid');
                    var newindex=_this.sidarr.indexOf(index);
                    _this.numberarr.splice([newindex],1);
                   _this.sidarr.splice([newindex],1);
                  
                    $(val).parents('.nonetr:visible').remove();    
               }) 
               $.cookie('shopnum', _this.numberarr, { expires: 7 });
                $.cookie('sid', _this.sidarr, { expires: 7 });
               _this.sumprice();
           })
       }

       //单个删除
       delsingle(){
           var _this=this;
           //$('.nonetr:visible')不能加点击事件？
           $('.nonetr').find('.td-del').on('click',function(){
               $(this).parent().remove();
               var index=$(this).parent().find('.cartimg').attr('sid');
                    var newindex=_this.sidarr.indexOf(index);
                    _this.numberarr.splice([newindex],1);
                    _this.sidarr.splice([newindex],1);
                    $.cookie('shopnum', _this.numberarr, { expires: 7 });
                    $.cookie('sid', _this.sidarr, { expires: 7 });
                    _this.sumprice();
           })
       }

      


    }

    new cart().init();

})();