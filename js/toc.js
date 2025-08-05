document.addEventListener("DOMContentLoaded", function () {
    const tocLinks = document.querySelectorAll("#toc a");
    const sections = document.querySelectorAll(".content h1, .content h2, .content h3, .content h4, .content h5, .content h6");
    function activateLink() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const middlePosition = scrollY + windowHeight / 2 - 150;
        // console.log("Middle position: " + middlePosition);
        let closestIndex = -1;
        let closestDistance = Infinity;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            // console.log("Title " + (i + 1) + " position: " + sectionTop);
            const distance = Math.abs(sectionTop - middlePosition);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        }

        tocLinks.forEach((link) => link.classList.remove("active"));

        if (closestIndex !== -1 && tocLinks[closestIndex]) {
            tocLinks[closestIndex].classList.add("active");
        }
    }

    activateLink();
    window.addEventListener("scroll", activateLink);
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('#menu a');

    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const { offsetWidth, offsetHeight } = link;
            const x = (e.offsetX / offsetWidth) * 20 - 10; // 控制水平移动范围
            const y = (e.offsetY / offsetHeight) * 20 - 10; // 控制垂直移动范围

            // 使用 translate3d 来移动背景
            const translateX = `${x}px`;
            const translateY = `${y}px`;
            link.querySelector('::before').style.transform = `translate3d(${translateX}, ${translateY}, 0)`;
        });

        link.addEventListener('mouseleave', () => {
            link.querySelector('::before').style.transform = `translate3d(0, 0, 0)`; // 鼠标离开时重置位置
        });
    });
});

function checkOverlapAndHide() {
    const tocDiv = document.getElementById('toc');
    const contentDivs = document.getElementsByClassName('content');

    if (!tocDiv) {
        console.log('未找到目录 div');
        return;
    }

    if (contentDivs.length === 0) {
        console.log('未找到内容 div');
        return;
    }

    const contentDiv = contentDivs[0];

    const tocRect = tocDiv.getBoundingClientRect();
    const contentRect = contentDiv.getBoundingClientRect();

    const isOverlapping = !(
        tocRect.right < contentRect.left ||
        tocRect.left > contentRect.right
    );

    tocDiv.style.visibility = isOverlapping ? 'hidden' : 'visible';
}
document.addEventListener("DOMContentLoaded", checkOverlapAndHide);
window.addEventListener('resize', checkOverlapAndHide);

function background() {
    let background = document.body['dataset']['images'];
    let images = background.split(",");
    let id = Math.floor(Math.random() * images.length);
    document.body.style.backgroundImage = `url('${images[id]}')`;
}
function checkRoute() {
    const path = window.location.pathname;
    const specialElement = document.getElementById('menu');
    
    if (path === '/' || path === '/index.html') {
        specialElement.style.display = 'block'; // 显示元素
    } else {
        specialElement.style.display = 'none'; // 隐藏元素
    }
}

// 页面加载时检查路由
window.onload = checkRoute;
background()
