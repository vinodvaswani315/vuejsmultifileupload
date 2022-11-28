<?php
// Count total files
$countfiles = count($_FILES);
// $response = array();
// Looping all files
//for($i=0;$i<$countfiles;$i++)
//{

    $filename = $_FILES['file']['name'];
    // Upload file
    move_uploaded_file($_FILES['file']['tmp_name'],'upload/'.$filename);
    $response = "http://localhost/files/upload/".$filename;

//}
echo $response;
exit;

?>