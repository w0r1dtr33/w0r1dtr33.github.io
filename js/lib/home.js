mixins.home = {
    mounted() {
        //home背景
        let background = this.$refs.indexBackground;
        let images = background.dataset.images.split(",");
        let id = Math.floor(Math.random() * images.length);
        document.body.style.backgroundImage = `url('${images[id]}')`;
        //home的loading
        let background_load = this.$refs.loading_images1;
        let images_load = background_load.dataset.images.split(",");
        let id_load = Math.floor(Math.random() * images_load.length);
        document.getElementById('loading-images1').src = `${images_load[id_load]}`;

        // let skin_load = this.$refs.skinbackground1;
        // let skinimages = skin_load.dataset.images.split(",");
        let cssrules = document.styleSheets[4].cssRules;
        // let skinIds = new Set();
        // let skinid;
        // do {
        //     skinid = Math.floor(Math.random() * skinimages.length);
        // } while (skinIds.has(skinid));
        // skinIds.add(skinid);
        // if (skinid < skinimages.length) {
        //     cssrules[56].style.backgroundImage = `url(${skinimages[skinid]})`;
        // }

        //home card
        let card_load = this.$refs.cardBackground;
        let card_images = card_load.dataset.images.split(",");
        let usedIds = new Set(); // 用于存储已使用的 cardid
        for (let i = 74; i < 79; i++) {
            let cardid;
            do {
                cardid = Math.floor(Math.random() * card_images.length);
            } while (usedIds.has(cardid));
            usedIds.add(cardid);
            if (cardid < card_images.length) {
                cssrules[i].style.backgroundImage = `url(${card_images[cardid]})`;
            }
        }
        this.menuColor = true;
    },
    methods: {
        homeClick() {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        },
    },
};