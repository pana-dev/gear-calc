//////////////////////////////////////
// Set API Key and Fields to return
//////////////////////////////////////
const API_KEY = "8k7kh3mvnanft46vcqv93ezgagcm2qsw";

// Function that builds the API URL
//////////////////////////////////////

function characterAPI(name, realm, region, field) {

    let base_url = null;

    if (region == 'en_us') {
        base_url = 'us';
    }

    if (region == 'en_GB') {
        base_url = 'eu';
    }

    if (region == 'ko_KR') {
        base_url = 'kr';
    }

    if (region == 'zh_TW') {
        base_url = 'tw'
    }

    return `https://${base_url}.api.battle.net/wow/character/${realm}/${name}?fields=${field}&locale=${region}&apikey=${API_KEY}`;

}

// Function to create an item
//////////////////////////////////////

function createRowItem(item) {

    // 1. Set Data

        const itemData = {
            IMAGE: item.icon,
            NAME: item.name,
            LEVEL: item.itemLevel
        };

    // 2. Create content elements

        const itemContent = {
            NAME: document.createElement('div'),
            LEVEL: document.createElement('div'),
            IMAGE: document.createElement('img')
        };

    // 3. Create structural elements

        const rowStructure = {
            WRAP: document.createElement("div"),
            MEDIA: document.createElement("div"),
            MEDIA_LEFT: document.createElement("div"),
            MEDIA_CONTENT: document.createElement("div")
        };

    // 4. Add styling to elements

        rowStructure.WRAP.classList.add("panel-block");
        rowStructure.MEDIA.classList.add('media');
        rowStructure.MEDIA_LEFT.classList.add("media-left");
        rowStructure.MEDIA_CONTENT.classList.add("media-content");
        rowStructure.MEDIA_CONTENT.classList.add('is-size-7');

    // 5. Construct the Front-End

        rowStructure.WRAP.appendChild(rowStructure.MEDIA);
            rowStructure.MEDIA.appendChild(rowStructure.MEDIA_LEFT);
                if (item.icon) {

                    // Set src and alt text for the image
                    itemContent.IMAGE.setAttribute(
                        "src",
                        `http://media.blizzard.com/wow/icons/36/${itemData.IMAGE}.jpg`
                    );

                    // image.setAttribute("alt", item.name);
                    rowStructure.MEDIA_LEFT.appendChild(itemContent.IMAGE);
                }
            rowStructure.MEDIA.appendChild(rowStructure.MEDIA_CONTENT);
                rowStructure.MEDIA_CONTENT.appendChild(itemContent.NAME);
                    itemContent.NAME.textContent = itemData.NAME;
                rowStructure.MEDIA_CONTENT.appendChild(itemContent.LEVEL);
                    itemContent.LEVEL.textContent = itemData.LEVEL;

    // 6. Render Row
        return rowStructure.WRAP;

}

// Fetch data and create items
//////////////////////////////////////

class characterItems {

    constructor(element) {
        this.element = element;
        this.formCharacter = this.element.querySelector("#formCharacter");
        this.characterName = this.element.querySelector("#characterName");
        this.characterRealm = this.element.querySelector("#characterRealm");
        this.characterRegion = this.element.querySelector("#characterRegion");
        this.wrap = this.element.querySelector("#itemsArmory");
        this.init();
    }

    renderItems(data) {

        for (let key in data.items) {

            const item = data.items[key];

            if (!item.icon) {
                continue;
            }

            const newRow = createRowItem(item);
            this.wrap.appendChild(newRow);
        }

    }

    fetchData(event) {

        event.preventDefault();
        this.wrap.innerHTML = null;
        this.wrap.classList.add('is-loading');

        fetch(characterAPI(this.characterName.value, this.characterRealm.value, this.characterRegion.value, 'items'))
            .then(response => response.json())
            .then((data) => {
                this.renderItems(data);
            })
            .catch((error) => {
                console.log('Could not find character' + error.message);
            });

    }

    init() {
        this.formCharacter.addEventListener("submit", this.fetchData.bind(this));
    }
    
}

const app = document.querySelector(".app");
new characterItems(app);