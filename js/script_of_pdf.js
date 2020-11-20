$(document).ready(function (){
    let text = '';
    let globalRange='';
    let items = null;
    let h =null;
    let span=null;
    let html=""
    const getTextNodesIn = function(el) {
        return $(el).find(":not(iframe)").addBack().contents().filter(function() {
            return this.nodeType == 3;
        });
    };
    getTextNodesIn($(document)).each(function (index,item){
        if ($(item).parent()[0].tagName !=="DIV"){
           $(item).parent()[0].addEventListener('contextmenu',function (el){
                if ($(this).text()){
                   try{
                       el.preventDefault();
                       items=$(globalRange.endContainer).parent()[0];
                       $(".selectItems").remove()
                       $($('body').children()[0]).append("<div style='position: absolute;z-index:1' id='selectItems' class='selectItems select'><select id=\"slct\" name=\"slct\" >\n" +
                           "    <option selected disabled value=\"\">Choose</option>\n" +
                           "    <option value=\"h1\">h1</option>\n" +
                           "    <option value=\"h2\">h2</option>\n" +
                           "    <option value=\"h3\">h3</option>\n" +
                           "    <option value=\"h4\">h4</option>\n" +
                           "    <option value=\"h5\">h5</option>\n" +
                           "    <option value=\"h6\">h6</option>\n" +
                           "  </select></div>")
                       $("#slct").on("change",function (){
                           $("#selectItems").remove()
                           if (this.value){
                               h=document.createElement(this.value)
                               span=document.createElement("span")
                               span.className=$(items)[0].className;
                               span.style=$(items).attr("style")
                               $(h).text(text);

                               $(span).append("<p>"+$(items).text().split(text)[0]+"</p>");
                               $(span).append(h)
                               $(span).append("<p>"+ $(items).text().split(text)[1]+"</p>")
                               $(items).replaceWith(span)
                               $($(document).children().children("body").children("div")[0]).css('margin','')
                               html=""
                               document.documentElement.outerHTML.split("&nbsp;").map(function (item){
                                   html=html+" "+item
                               })
                               $.ajax({
                                   method: 'POST',
                                   url: '../save.php',
                                   data: "path="+$('body').attr('data-file')+"&html="+html+"&action=save",
                               })
                           }
                       })
                       $(".selectItems").css("top",$(items).position().top)
                       $(".selectItems").css("left",$(items).position().left)
                   }catch (e){

                   }
                }
                return false
            },false)
            $($(item).parent()[0]).on("mouseup", function(){
                if ($(this).text() ) {
                    var sel = window.getSelection(), range;
                    if (sel.getRangeAt) {
                       try{
                           range = sel.getRangeAt(0);
                           text=sel.toString();
                           globalRange=range;
                       }catch (e){}
                    }
                }
            });
        }
    })

})