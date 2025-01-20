<?php require 'conn.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Category</title>
</head>
<body>
    <a href="admin.php">Admin Page</a><br><br>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="file" name="image"><br><br>
        <input type="text" name="catName" placeholder="enter Category name..."><br><br><br>
        <button type="submit" >ADD</button><br>
    </form>

    <?php
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        if(isset($_POST['catName']) && isset($_FILES['image'])){
            $catName = $_POST['catName'];
            $imgName = $_FILES['image']['name'];
            $directory = "img\\" . $imgName;
            echo $catName;
            echo $directory;
            if(move_uploaded_file($_FILES['image']['tmp_name'] , $directory)){
                $sql = "insert into category(categoryname , img_path) values (? , ?);";
                $stmt = $conn->prepare($sql);
                if($stmt){
                    $stmt->bind_param('ss' , $catName , $directory);
                    if($stmt->execute()){
                        echo 'inserted successfully';
                    }else{
                        echo 'failed in execute';
                    }
                }else{
                    echo 'error in prepare';
                }
            }
            
            
            
        }
    }
    ?>
</body>
</html>