<?php

$target_dir = "uploads/";
$f_name = uniqid()."_".$_FILES["file"]["name"];
$target_file = $target_dir . basename($f_name);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["files"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check if file already exists
//print_r($target_file);die;
if (file_exists($target_file)) {
    $uploadOk = 0;
    echo json_encode(["error"=>$f_name]);
    return;
}

// Check file size
//if ($_FILES["file"]["size"] > 500000) {
//    echo "Sorry, your file is too large.";
//    $uploadOk = 0;
//}

// Allow certain file formats
if($imageFileType != "pdf" ) {
    echo "Sorry, only pdf files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo json_encode(["error"=>$f_name]);

// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
//        echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded.";
//        exec("pdftohtml uploads/37443b1d-721c-47a9-a553-56c6aa627523.pdf to_html/test.html");
//        $a = passthru("pdftohtml, uploads/$target_file to_html/test");
//        print_r($a);
        chmod($target_file,'0777');
        echo json_encode(["success"=>$f_name]);
    } else {
        echo json_encode(["error"=>$f_name]);
    }
}