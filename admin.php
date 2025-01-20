<?php 
require 'conn.php';

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
</head>
<body>
    <h1><a href="addCategory.php">Add Category</a></h1>
    <h1><a href="addItem.php">Add Item</a></h1>
    <hr>
    <table>
        <thead>
            <th>ID</th>
            <th>category</th>
            <th>name</th>
            <th>price</th>
            <th>featured</th>
            <th>Delete</th>
            <th>Featured</th>
        </thead>
        <tbody>
            
        <?php 
        $sql = "select * from items, category where items.catId = category.categoryid;";
        $result = $conn->query($sql);
        while($row = $result->fetch_assoc()){
            echo'
                <tr>
                <td>'.$row['itemId'].'</td>
                <td>'.$row['categoryname'].'</td>
                <td>'.$row['name'].'</td>
                <td>'.$row['itemprice'].'</td>
                <td>'.$row['featured'].'</td>
                <td><form method="post">
                    <input type="hidden" name="itemId" value="'.$row['itemId'].'">
                <button data-id = '.$row['itemId'].' name = "delBtn">Delete</button></form></td>
                <td><button>Toggle Featured</button></td>
            </tr>
            ';
        }
    ?>
        </tbody>
    </table>
    <?php 
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['delBtn'])){
            $itemId = $_POST['itemId'];
            $sql = "delete from items where itemId = $itemId;";
            $stmt = $conn->query($sql); 
            if($stmt){
                header("Location:admin.php");
            }
        }
    }
    ?>
    
</body>
</html>