<?php require 'conn.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Item</title>
    <form method="post" >
        <h1>Add Item</h1>
        <select name="category" id="">
            <option value="">select category</option>
        <?php 
           
            $sql = "select * from category;";
            $result = $conn->query($sql);
            while($row = $result->fetch_assoc()){
                echo '<option value="'.$row['categoryid'].'">'.$row['categoryname'].'</option>';
            }

        ?>
        </select><br><br>
        <input type="text" name="name"> <br><br>
        <input type="number" name="itemprice" id=""><br><br>
        <button type="submit">ADD</button>
        <?php 
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $name = $_POST['name'];
            $catId = $_POST['category'];
            $itemprice = $_POST['itemprice'];
            
            $sql = "insert into items(catId , name , itemprice ) values ($catId , '$name' , $itemprice );";
            $stmt = $conn->query($sql);
            if($stmt){
                echo 'inserted Successfully';
            }else{
                echo 'Failed to insert';
            }
        }
        ?>

    </form>
</head>
<body>
    
</body>
</html>