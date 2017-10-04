const config = {
    API_KEY: "8k7kh3mvnanft46vcqv93ezgagcm2qsw",
    LOCALE: "en_us",
    FIELDS: ["items+", "professions+", "stats+", "talents"]
};

function configureUrl(realmInput, characterInput, regionInput) {

    if (regionInput == 'en_us') {
        var base_url = 'us';
    }

    if (regionInput == 'en_GB') {
        var base_url = 'eu';
    }

    if (regionInput == 'ko_KR') {
        var base_url = 'kr';
    }

    if (regionInput == 'zh_TW') {
        var base_url = 'tw'
    }

    return `https://${base_url}.api.battle.net/wow/character/${realmInput.value}/${characterInput.value}?fields=${config.FIELDS}&locale=${regionInput}&apikey=${config.API_KEY}`;
}

function createItemRow(item) {
    // Create different elements for each row
    const row = document.createElement("div"),
        media = document.createElement("div"),
        imageWrap = document.createElement("div"),
        infoWrap = document.createElement("div"),
        name = document.createElement("div"),
        level = document.createElement("div");

    if (item.icon) {
        const image = document.createElement("img");

        // Set src and alt text for the image
        image.setAttribute(
            "src",
            `http://media.blizzard.com/wow/icons/36/${item.icon}.jpg`
        );

        // image.setAttribute("alt", item.name);

        // Insert image into image wrap
        imageWrap.appendChild(image);
    }

    // Add class to row (li) element
    row.classList.add("panel-block");

    // Add class to media object
    media.classList.add('media');

    // Add class to image wrap
    imageWrap.classList.add("media-left");

    // Add class to item information wrap
    infoWrap.classList.add("media-content");
    infoWrap.classList.add('is-size-7');

    // Set text for the item name and level
    name.textContent = item.name;
    level.textContent = item.itemLevel;

    // Insert name and level within infowrap
    infoWrap.appendChild(name);
    infoWrap.appendChild(level);

    // Insert image and info into each row

    media.appendChild(imageWrap);
    media.appendChild(infoWrap);
    row.appendChild(media);

    // Output row`
    return row;
}

class App {
    constructor(element) {
        this.element = element;
        this.form = this.element.querySelector(".search-character");
        this.button = this.element.querySelector(".app-button");
        this.characterInput = this.element.querySelector("#character");
        this.realmInput = this.element.querySelector("#realm");
        this.regionInput = this.element.querySelector("#region");
        this.dataWrap = this.element.querySelector(".app-data");
        this.init();
    }

    renderItems(items) {
        const itemsTitle = document.createElement('p'),
            panelBlock = document.createElement('div'),
            panelControl = document.createElement('p'),
            panelInput = document.createElement('input');

        itemsTitle.innerHTML = 'Items';
        itemsTitle.classList.add('panel-heading');

        panelBlock.classList.add('panel-block');
        panelControl.classList.add('control');
        panelInput.classList.add('input');
        panelInput.classList.add('is-small');
        panelInput.setAttribute('placeholder', 'Paste Pawn string');

        this.dataWrap.appendChild(itemsTitle);
        panelControl.appendChild(panelInput);
        panelBlock.appendChild(panelControl);
        this.dataWrap.appendChild(panelBlock);

        for (let key in items) {
            const item = items[key];

            if (!item.icon) {
                continue;
            }

            const itemRow = createItemRow(item);
            this.dataWrap.appendChild(itemRow);
        }
    }

    renderData(characterData) {
        const { items, stats, talents } = characterData;

        if (items) {
            this.renderItems(items);
        }
    }

    fetchData(event) {
        event.preventDefault();
        // Cheap clear on new fetch
        this.dataWrap.innerHTML = null;
        // Cheap loading flag
        this.dataWrap.classList.add('is-loading');

        fetch(configureUrl(this.realmInput, this.characterInput, this.regionInput.value))
            .then(response => response.json())
            .then((characterData) => {
                this.dataWrap.classList.remove('is-loading');
                this.renderData(characterData);
            });
    }

    init() {
        this.form.addEventListener("submit", this.fetchData.bind(this));
    }
}

const app = document.querySelector(".app");
new App(app);