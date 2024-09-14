const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        window.addEventListener("load", () => {
            let background_load2 = document.getElementById('loading_images2');
            let images_load2 = background_load2.dataset.images.split(",");
            let id_load2 = Math.floor(Math.random() * images_load2.length);
            document.getElementById('loading-images2').src = `${images_load2[id_load2]}`;

            let skin_load = document.getElementById('skin-background2');
            let skinimages = skin_load.dataset.images.split(",");
            let cssrules = document.styleSheets[4].cssRules;
            let skinIds = new Set();
            let skinid;
            do {
                skinid = Math.floor(Math.random() * skinimages.length);
            } while (skinIds.has(skinid));
            skinIds.add(skinid);
            if (skinid < skinimages.length) {
                cssrules[56].style.backgroundImage = `url(${skinimages[skinid]})`;
            }

            setTimeout(() => {
                this.loading = false;
            },600);
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");
