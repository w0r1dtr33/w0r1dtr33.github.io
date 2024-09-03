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

function checkOverlapAndHide() {
    const tocDiv = document.getElementById('toc');
    const contentDivs = document.getElementsByClassName('content');

    if (!tocDiv) {
        console.error('未找到目录 div');
        return;
    }

    if (contentDivs.length === 0) {
        console.error('未找到内容 div');
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
background()