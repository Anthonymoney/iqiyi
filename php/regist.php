<?php
   //引用文件
   include "conn.php";//引入数据库连接的文件。
   //2.获取前端传来的用户名和数据库进行匹配
   if(isset($_POST['username']) || isset($_POST['submit'])){
       $username=$_POST['username'];
       //进行匹配
       $result=mysql_query("select * from user where username='$username' ");//where:条件
       //如果$resut有结果证明用户名存在，否则不存在
       if(!mysql_fetch_array($result,MYSQL_ASSOC)){//用户名不存在
           echo true;//1  不存在
       }else {
           echo false;//空  存在
       }
   }else{
       exit('非法操作');//退出并输出内部的字符串
   }






    //1.将用户注册的信息获取，点击submit
    if(isset($_POST['submit'])){
        $user=$_POST['username'];
        $pass=sha1($_POST['password']);//php默认的函数进行sha1加密。
        //增
        mysql_query("insert user values(null,'$user','$pass',NOW())");//NOW():当前的时间
        header('location:http://10.31.163.23/iqiyi/src/index11.html');
    }

    

?>


