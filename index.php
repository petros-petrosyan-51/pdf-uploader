<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container">
    <section>
        <div class="row">
            <div class="col-8">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="myfile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
            <div class="col-4">
                <button type="button" class="btn btn-primary" id="upload_pdf">Submit</button>
            </div>
        </div>
    </section>
</div>
<div class="container">
    <div style="display: none" class="pdf_html"  data-file="">
        <div class="pdf_header">
        <span id="title" class="pdf_header_child">
            css_toturial.pdf
        </span>
            <div class="pdf_header_child">
              <span class="arrows" id="left">
                  <i style="font-size: 17px;" class="material-icons">keyboard_arrow_left</i>
              </span>
                <span  class="page">
                  1
              </span>/
                <span   class="page_count">
                   2
              </span>
                <span class="arrows" id="right">
                <i style="font-size: 17px;" class="material-icons">keyboard_arrow_right</i>
            </span>
            </div>
            <div class="pdf_header_child margin-5">
                <a href="#" class="buttonDownload">Download</a>
            </div>
        </div>
        <div class="pdf_content">
        </div>
    </div>
    <div class="loading" style="display:none;">
        <span>↓</span>
        <span style="--delay: 0.1s">↓</span>
        <span style="--delay: 0.3s">↓</span>
        <span style="--delay: 0.4s">↓</span>
        <span style="--delay: 0.5s">↓</span>
    </div>
</div>
<script src="js/jquery.js"></script>
<script src="js/upload.js"></script>
<script src="js/script.js"></script>
</body>
</html>