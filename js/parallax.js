
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
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(7deg) scale(1.1)';
                break;
            case 2:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(3deg) scale(1)';
                break;
            case 3:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) scale(0.95)';
                break;
            case 4:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(-3deg) scale(1)';
                break;
            case 5:
                element.style.transform = 'translate3d(' + x + ',' + y + ', 0) rotateY(-7deg) scale(1.1)';
                break;
        }
    } else if (this.transform2DSupport) {
        element.style.transform = 'translate(' + x + ',' + y + ')';
    } else {
        element.style.left = x;
        element.style.top = y;
    }
};

Parallax.prototype.setPosition_mid = function(element, x, y) {
    const scaleFactor = 1.5; // 设置缩放因子，调整移动量
    // 应用缩放因子
    x = (x * scaleFactor).toFixed(this.precision) + 'px';
    y = (y * scaleFactor).toFixed(this.precision) + 'px';
    
    element.style.transform = 'translate3d(' + x + ',' + y + ', 0)';
};
Parallax.prototype.setPosition_line = function(element, x, y) {
    const scaleFactor = 0.2; // 设置缩放因子，调整移动量
    // 应用缩放因子
    x = (x * scaleFactor).toFixed(this.precision) + 'px';
    y = (y * scaleFactor).toFixed(this.precision) + 'px';
    
    element.style.transform = 'translate3d(' + x + ',' + y + ', 0)';
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
    const items = document.querySelectorAll('.parallax-item');
    const antiitems = document.querySelectorAll('.anti-parallax-item');
    const mids = document.querySelectorAll('.parallax-mid');
    const lines = document.querySelectorAll('.parallax-line'); // 选择所有目标元素
    antiitems.forEach(antiitem => {
        const rect = antiitem.getBoundingClientRect(); // 获取元素的位置信息
    
        // 反向计算偏移量并向左移动
        const offsetX = (rect.left + rect.width / 2 - mouseX) * 0.01 - 55; // 向左移动的偏移量
        const offsetY = (rect.top + rect.height / 2 - mouseY) * 0.05 - 55; // 计算垂直偏移
    
        parallax.setPosition(antiitem, offsetX, offsetY); // 设置位置
    });
    items.forEach(item => {
        const rect = item.getBoundingClientRect(); // 获取元素的位置信息
        
        // 减小偏移量的幅度
        const offsetX = (mouseX - rect.left - rect.width / 2) * 0.05; // 计算水平偏移
        const offsetY = (mouseY - rect.top - rect.height / 2) * 0.05; // 计算垂直偏移
        
        parallax.setPosition(item, offsetX, offsetY); // 设置位置
    });
    
    mids.forEach(mid => {
        const rect = mid.getBoundingClientRect(); // 获取元素的位置信息
        
        // 计算新的偏移量，不影响前面的计算
        const midOffsetX = (mouseX - rect.left - rect.width / 2) * 0.05; // 计算水平偏移
        const midOffsetY = (mouseY - rect.top - rect.height / 2) * 0.05; // 计算垂直偏移
        
        parallax.setPosition_mid(mid, midOffsetX, midOffsetY); // 设置位置
    });

    lines.forEach(line => {
        const rect = line.getBoundingClientRect(); // 获取元素的位置信息
        
        // 计算新的偏移量，不影响前面的计算
        const lineOffsetX = (mouseX - rect.left - rect.width / 2) * 0.05; // 计算水平偏移
        const lineOffsetY = (mouseY - rect.top - rect.height / 2) * 0.05; // 计算垂直偏移
        
        parallax.setPosition_line(line, lineOffsetX, lineOffsetY); // 设置位置
    });
    
    requestAnimationFrame(updateParallax); // 循环调用
}
// 启动更新循环
updateParallax();

// document.addEventListener('DOMContentLoaded', () => {
//     const items = document.querySelectorAll('.parallax-item');

//     items.forEach(item => {
//         item.addEventListener('mouseenter', () => {
//             items.forEach(i => {
//                 if (i !== item) {
//                     i.classList.add('dimmed'); // 其他链接变暗
//                 }
//             });
//         });

//         item.addEventListener('mouseleave', () => {
//             items.forEach(i => {
//                 i.classList.remove('dimmed'); // 恢复所有链接的样式
//             });
//         });
//     });
// });