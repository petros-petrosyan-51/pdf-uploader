<?php
include 'vendor/autoload.php';
if (array_key_exists("src", $_POST)) {
    $pdf = new Gufy\PdfToHtml\Pdf("uploads/".$_POST["src"]);
//    print_r($_POST);die;
    \Gufy\PdfToHtml\Config::set('pdftohtml.output', dirname(__FILE__) . '/pdf_html');
    $html = $pdf->html();
    $page = $pdf->html(1);
    $dom = $pdf->getDom();
    $total_pages = $pdf->getPages();
//    $paragraphs = $dom->find('body > p');
//    print_r("pdf_html/".explode( ".",$_POST["src"])[0].".html");die;

    $file = fopen("pdf_html/".explode( ".",$_POST["src"])[0].".html","r");
    $html = "";
    while(!feof($file)) {
        $tmp = fgets($file);
        if($tmp == "</head>\n"){
            $html .= "<style>div{margin: auto}</style>";
            $html .='<link rel="stylesheet" href="../css/style.css">';
            $html .= "<script src='../js/jquery.js'></script>\n";
            $html .= "<script src='../js/script.js'></script>\n";
            $html .= "<script src='../js/script_of_pdf.js'></script>\n";
            $html .= $tmp;

        }else{
            $html .= $tmp;
        }
    }
    fclose($file);

    $wfile = fopen("pdf_html/".explode( ".",$_POST["src"])[0].".html","w");
    fwrite($wfile,$html);
    fclose($wfile);

    $rfile = fopen("pdf_html/".explode( ".",$_POST["src"])[0]."-1.html","r");
    $html2 = "";
    $tmp2 = "";
    while(!feof($rfile)) {
        $tmp2 = fgets($rfile);
        if($tmp2 == "</body>"){
            $html .= "<style>div{margin: auto}</style>";
            $html2 .='<link rel="stylesheet" href="../css/style.css">';
            $html2 .= "<script src='../js/jquery.js'></script>\n";
            $html2 .= "<script src='../js/script.js'></script>\n";
            $html2 .= "<script src='../js/script_of_pdf.js'></script>\n";
            $html2 .= $tmp2;
        }else{
            $html2 .= $tmp2;
        }
    }
    fclose($rfile);
    $rwfile = fopen("pdf_html/".explode( ".",$_POST["src"])[0]."-1.html","w");
    fwrite($rwfile,$html2);
    fclose($rwfile);


    echo json_encode([
        "tmpl1"=>"pdf_html/".explode( ".",$_POST["src"])[0].".html",
        "tmpl2"=>"pdf_html/".explode( ".",$_POST["src"])[0]."-1.html",
    ]);



//    echo json_encode([
//        "tmpl1"=>file_get_contents("pdf_html/".explode( ".",$_POST["src"])[0]."-1.html"),
//        "tmpl2"=>file_get_contents("pdf_html/".explode( ".",$_POST["src"])[0].".html"),
//    ]);
//    echo json_encode(["tmpl"=>file_get_contents("pdf_html/".explode( ".",$_POST["src"])[0].".html")]);
//    echo json_encode(["tmpl"=>'"pdf_html/".explode( ".",$_POST["src"])[0].".html"]');
}

?>
