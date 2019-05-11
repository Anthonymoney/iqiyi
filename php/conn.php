<?php
    header('content-type:text/html;charset=utf-8');
    
    define('HOST','localhost');
    define('USERNAME','root');
    define('PASSWORD','');

    $conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:容错,让错误不显示。
    if(!$conn){
        die('数据库连接错误:'.mysql_error());
    }

    mysql_select_db('iqiyi');
    mysql_query('SET NAMES UTF8');
?>