<?php
    include "conn.php";

    if(isset($_POST['username']) && isset($_POST['password'])){
        $name=$_POST['username'];
        $pass=sha1($_POST['password']);
        $result=mysql_query("select * from user where username='$name' and password='$pass' ");
        if(mysql_fetch_array($result,MYSQL_ASSOC)){//有结果，存在，登录成功
            echo true;
        }else{
            echo false;//登录失败
        }
    }else{
        exit('非法操作');
    }

?>