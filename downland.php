<?php
require "vendor/autoload.php";
use Dompdf\Dompdf;
use setasign\Fpdi\Fpdi;
if(isset($_GET["action"]) && $_GET["action"] ==="downland"&&  isset($_GET["fileName"]) &&  isset($_GET["FileArray"])) {
    $fileName =$_GET["fileName"];
    $filePathArray= json_decode($_GET["FileArray"]);
    $htmldocs=[];
    foreach ($filePathArray as $filePath){
        $rfile = file_get_contents('pdf_html/'.$filePath.'.html');
        array_push($htmldocs,$rfile);
    }
    foreach ($htmldocs as $index => $html) {
        $dompdf = new Dompdf(array('enable_remote' => true));
        $dompdf->setPaper('A4','potrait');
        $dompdf->loadHtml($html);
        $dompdf->render();
        $output = $dompdf->output();
        $index=$index+1;
        file_put_contents( 'html_pdf/'.$fileName.'-'.$index . '.pdf', $output);
        unset($dompdf);
    }

    $pdf = new Fpdi();
    $files = [];
    foreach ($filePathArray as $filePath){
        array_push($files,'html_pdf/'.$filePath.'.pdf');
    }
    foreach ($files as $file) {
        $pageCount = $pdf->setSourceFile($file);
        for ($i = 0; $i < $pageCount; $i++) {
            $tpl = $pdf->importPage($i + 1, '/MediaBox');
            $pdf->AddPage();
            $pdf->useTemplate($tpl);
        }
    }
    $pdf->Output('F','html_pdf/'.$fileName.'.pdf');
   header("Content-type:application/pdf");
    header("Content-Disposition:attachment;filename=". explode('_',$fileName)[1].'.pdf');
    readfile('html_pdf/'.$fileName.'.pdf');
}

