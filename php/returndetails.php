<?php
    include 'conn.php';
    if(isset($_GET['sid'])){
        $sid=$_GET['sid'];
        $result=mysql_query("select * from piclist where sid=$sid ");
        echo json_encode(mysql_fetch_array($result,MYSQL_ASSOC));
    }
?>