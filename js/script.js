$(document).ready(function () {
    $("#get_pdf").css("display", "none");
    let page_path = "";
    let page_count=0;
    let Doctype=null;
    let Body =''
    let array=[];
    let width = null;
    $("#upload_pdf").on("click", function (e) {
        e.preventDefault();
        $('.loading').show()
        var file_data = $('#myfile').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            url: 'upload.php', // point to server-side PHP script
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function (php_script_response) {
                if (php_script_response && "success" in JSON.parse(php_script_response)) {
                    $.ajax({
                        url: "main.php",
                        type: "post",
                        data: {"src": JSON.parse(php_script_response).success},
                        success: function (data) {
                            page_count=0;
                            page_path=JSON.parse(data).tmpl1.split("pdf_html/")[1]?"pdf_html/"+JSON.parse(data).tmpl1.split("pdf_html/")[1].split(".html")[0]+"_ind.html":""
                            const pagePath =JSON.parse(data).tmpl1.split('.html')[0];
                            const tml2=JSON.parse(data).tmpl2;
                            $("#title").text($("#myfile")[0].files[0].name)
                            $(".pdf_html").attr("data-file",JSON.parse(data).tmpl1)
                            $(".pdf_content").empty()
                            $("#right").click(function (){
                                if (parseInt(page_count)>parseInt($(".page").text().trim())){
                                    const page =parseInt($(".page").text().trim())+1;
                                    $(".page").text(page)
                                    $(" iframe").attr("data-file",$(".pdf_html").attr("data-file").split(".html")[0]+"-"+page+".html")
                                    $(' iframe').attr("src",window.location.href+$(".pdf_html").attr("data-file").split(".html")[0]+"-"+page+".html"+'')
                                    $(".iframe_content").on("load", function() {
                                        const body = $(".iframe_content").contents().find("body")[0];
                                        const head = $(".iframe_content").contents().find("head")[0];
                                        $(body).attr("data-file",$(".iframe_content").attr('data-file'))
                                        $(head).append('<link rel="stylesheet" href="../css/style.css">')
                                        $(body).append("<script src='../js/jquery.js'></script>")
                                        $(body).append("<script src='../js/script_of_pdf.js'></script>")
                                    })
                                }
                            })
                            $("#left").click(function (){
                               if (parseInt($(".page").text()) !== 1){
                                   const page =parseInt($(".page").text().trim())-1;
                                   $(".page").text(page)
                                   $(' iframe').attr("src",window.location.href+$(".pdf_html").attr("data-file").split(".html")[0]+"-"+page+".html"+'')
                                   $(" iframe").attr("data-file",$(".pdf_html").attr("data-file").split(".html")[0]+"-"+page+".html")
                                   $(".iframe_content").on("load", function() {
                                       const body = $(".iframe_content").contents().find("body")[0];
                                       const head = $(".iframe_content").contents().find("head")[0];
                                       $(body).attr("data-file",$(".iframe_content").attr('data-file'))
                                       $(head).append('<link rel="stylesheet" href="../css/style.css">')
                                       $(body).append("<script src='../js/jquery.js'></script>")
                                       $(body).append("<script src='../js/script_of_pdf.js'></script>")
                                   })
                               }

                            })
                            $(".pdf_content").append("<iframe data-file='"+tml2+"' id='myIframeId' class='iframe_content' style='width: 100%;height: 800px;display: none' name='contents'" +
                                "src='http://localhost/pdf_uploader_2/"+tml2+"'>" +
                                "</iframe>")
                            $.get(page_path).then(data=>{
                                $(data).each(function (index,item){
                                    if (item.tagName==="A"){
                                       page_count=page_count+1;
                                    }
                                })

                                for (let i=1;i<=page_count;i++){
                                    $.get(pagePath+"-"+i+'.html').then(html=>{
                                        Doctype=null;
                                        Doctype=document.createElement('body');
                                        Body='<body data-file="'+pagePath+"-"+i+'.html'+'">';
                                        $(html).each(function (index,item){
                                           if (item.tagName){
                                               if (item.tagName==="DIV"){
                                                   width=$(item).width();
                                                   $(item).children().each(function (ind,elem){
                                                       if (elem.tagName==="SPAN" || elem.tagName==="P"){
                                                          $(elem).css('width',100-parseInt($(elem).css('left').split("px")[0])*100/width+"%");
                                                          $(elem).css('white-space','')
                                                          $(elem).css('left',parseInt($(elem).css('left').split("px")[0])*100/width+'%')
                                                       }
                                                   })
                                                   $(item).css('width','100%')
                                                   $(item).css('height','')
                                                  $($(item).find(' img')[0]).css('max-width','100%')
                                                   $($(item).find(' img')[0]).css('max-height','800px')
                                                   $($(item).find(' img')[0]).attr('src',window.location.href+'pdf_html/'+$($(item).find(' img')[0]).attr('src'))
                                               }
                                               $(Doctype).append(item);

                                           }
                                        })

                                        $(Doctype)[0].outerHTML.split("&nbsp;").map(function (item){
                                            Body=Body+" "+item;
                                        })
                                        Body=Body+" "+"</body>"
                                        $.ajax({
                                            method: 'POST',
                                            url: 'save.php',
                                            data: "path="+pagePath+"-"+i+'.html'+"&html="+Body.toString()+"&action=save",
                                            success: function (res){
                                                if (res==="ok"){
                                                    if (pagePath+"-"+i+'.html'===tml2){
                                                       $(' iframe').attr('src',$(' iframe').attr('src'))
                                                       $(' iframe').css('display','')
                                                        $(".pdf_html").toggle()
                                                        $('.loading').hide()
                                                        array=[]
                                                        const fileName=pagePath.split('pdf_html/')[1];
                                                        for (let i =1;i<=page_count;i++){
                                                            array.push(pagePath.split('pdf_html/')[1]+"-"+i)
                                                        }
                                                        $(".buttonDownload").attr('href','downland.php?action=downland&fileName='+fileName+'&FileArray='+JSON.stringify(array))


                                                    }
                                                }
                                            }
                                        })
                                    })
                                }
                                $(".iframe_content").on("load", function() {
                                    const body = $(".iframe_content").contents().find("body")[0];
                                    $(body).attr('bgcolor','')
                                    $(body).attr('vlink','')
                                    $(body).attr('link','')
                                    $($(body).children()[0]).css('width','100%')
                                    $(body).attr("data-file",$(".iframe_content").attr('data-file'))
                                });
                                $(".page_count").text(page_count)

                            })


                        }
                    })
                }
            }
        });
    })
})
