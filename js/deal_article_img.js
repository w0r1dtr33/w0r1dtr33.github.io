para = document.body.getElementsByClassName("post_article")[0].getElementsByTagName("p")
console.log(para.length)

for(var i = 0;i < para.length; i++){
    
    if(para[i].getElementsByTagName("img")[0]!=undefined){
        if(para[i].getElementsByTagName("img")[0].tagName == "IMG"){
            para[i].getElementsByTagName("img")[0].style.maxWidth = "100%"
        }
    }
}