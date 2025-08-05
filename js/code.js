
function folder(button){
    const article = button.previousElementSibling
    const hasclass = article.classList.contains('collapsed');
    if(hasclass){
        article.classList.remove('collapsed');
        button.textContent = '折叠';
    }else{
        article.classList.add('collapsed');
        //overflow
        button.textContent = '展开';
        article.style.overflowY = "hidden";
    }
    
}