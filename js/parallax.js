
function Parallax(precision) {
    this.precision = precision || 2; // 设置小数精度
    this.transform3DSupport = this.checkTransform3DSupport();
    this.transform2DSupport = this.checkTransform2DSupport();
}

Parallax.prototype.checkTransform3DSupport = function() {
    return 'webkitTransform' in document.body.style || 'transform' in document.body.style;
};

Parallax.prototype.checkTransform2DSupport = function() {
    return 'webkitTransform' in document.body.style || 'transform' in document.body.style;
};

Parallax.prototype.setPosition = function(element, x, y) {
    x = x.toFixed(this.precision) + 'px';
    y = y.toFixed(this.precision) + 'px';
    
    if (this.transform3DSupport) {
        element.style.transition =  'transform 0.3s';
        let box_id = Number(element.className.split(" ")[1].slice(-1));
        switch(box_id){
            case 1:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(5deg) scale(1.2)';
                break;
            case 2:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(3deg) scale(1.1)';
                break;
            case 3:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0)';
                break;
            case 4:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(-3deg) scale(1.1)';
                break;
            case 5:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(-5deg) scale(1.2)';
                break;
        }
    } else if (this.transform2DSupport) {
        element.style.transform = 'translate(' + x + ',' + y + ')';
    } else {
        element.style.left = x;
        element.style.top = y;
    }
};

// 创建实例
const parallax = new Parallax(2);
let mouseX = 0;
let mouseY = 0;

// 鼠标移动事件
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 使用 requestAnimationFrame 来平滑更新
function updateParallax() {
    const items = document.querySelectorAll('.parallax-item'); // 选择所有目标元素
    items.forEach(item => {
        const rect = item.getBoundingClientRect(); // 获取元素的位置信息
        
        // 减小偏移量的幅度
        const offsetX = (mouseX - rect.left - rect.width / 2) * 0.05; // 计算水平偏移
        const offsetY = (mouseY - rect.top - rect.height / 2) * 0.05; // 计算垂直偏移
        
        parallax.setPosition(item, offsetX, offsetY); // 设置位置
    });
    
    requestAnimationFrame(updateParallax); // 循环调用
}

// 启动更新循环
updateParallax();