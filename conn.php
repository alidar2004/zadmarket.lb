<?php
// $servername = "sql112.infinityfree.com";
// $username = "if0_37874285";
// $password = "dcUgc40Hgl";
// $dbname = "if0_37874285_zad";

// $conn = new mysqli($servername , $username , $password , $password);

// if($conn->connect_error){
//     die ('failed: ' . $conn->connect_error);
// }else{
//     echo 'success';
// }
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "zad";

$conn = new mysqli($servername , $username , $password , $dbname);

if($conn->connect_error){
    die ('failed: ' . $conn->connect_error);
}
