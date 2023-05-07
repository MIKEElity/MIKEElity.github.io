<?php
    $server = "localhost";
    $username = "root";
    $password = "";
    $dbname = "interest";
    $conn = new mysqli($server,$username,$password,$dbname);

    if($conn->connect_error){

        die("Connection failed" .$conn->connect_error);
    }

    if(isset($_POST['text'])){

        $text =$_POST['text'];

        $sql = "INSERT INTO loan(cntn,TIMEIN) VALUES('$text',NOW())";
        if ($conn->query($sql)=== TRUE){

            ECHO "success";


        }else{
            echo "Error : " . $sql . "<br>" . $conn->error;
        }

        header("location:attendance.php");


    }
    $conn->close();
    
?>
