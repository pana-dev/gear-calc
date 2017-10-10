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

// Item fetch 

function itemAPI(id) {
    
    return `https://us.api.battle.net/wow/item/${id}&locale=en_US&apikey=${API_KEY}`;

}

// Stats mapping
//////////////////////////////////////

const STATS = [
    {id: -1, stat: "None"},
    {id: 0, stat: "Mana"},
    {id: 1, stat: "Health"},
    {id: 3, stat: "Agility"},
    {id: 4, stat: "Strenght"},
    {id: 5, stat: "Intellect"},
    {id: 6, stat: "Spirit"},
    {id: 7, stat: "Stamina"},
    {id: 12, stat: "Defense Skill"},
    {id: 13, stat: "Dodge"},
    {id: 14, stat: "Parry"},
    {id: 15, stat: "Block"},
    {id: 16, stat: "Melee Hit"},
    {id: 17, stat: "Ranged Hit"},
    {id: 18, stat: "Spell Hit"},
    {id: 19, stat: "Melee Crit"},
    {id: 20, stat: "Ranged Crit"},
    {id: 21, stat: "Spell Crit"},
    {id: 22, stat: "Melee Hit Taken"},
    {id: 23, stat: "Ranged Hit Taken"},
    {id: 24, stat: "Spell Hit Taken"},
    {id: 25, stat: "Melee Crit Taken"},
    {id: 26, stat: "Ranged Crit Taken"},
    {id: 27, stat: "Spell Crit Taken"},
    {id: 28, stat: "Melee Haste"},
    {id: 29, stat: "Ranged Haste"},
    {id: 30, stat: "Spell Haste"},
    {id: 31, stat: "Hit"},
    {id: 32, stat: "Crit"},
    {id: 33, stat: "Hit Taken"},
    {id: 34, stat: "Crit Taken"},
    {id: 35, stat: "Resilience"},
    {id: 36, stat: "Haste"},
    {id: 37, stat: "Expertise"},
    {id: 38, stat: "Attack Power"},
    {id: 39, stat: "Ranged Attack Power"},
    {id: 40, stat: "Versatility"},
    {id: 41, stat: "Spell Healing Done"},
    {id: 42, stat: "Spell Damage Done"},
    {id: 43, stat: "Mana Regeneration"},
    {id: 44, stat: "Armor Penetration"},
    {id: 45, stat: "Spell Power"},
    {id: 46, stat: "Health Regen"},
    {id: 47, stat: "Spell Penetration"},
    {id: 48, stat: "Block Value"},
    {id: 49, stat: "Mastery"},
    {id: 50, stat: "Bonus Armor"},
    {id: 51, stat: "Fire Resistance"},
    {id: 52, stat: "Frost Resistance"},
    {id: 53, stat: "Holy Resistance"},
    {id: 54, stat: "Shadow Resistance"},
    {id: 55, stat: "Nature Resistance"},
    {id: 56, stat: "Arcane Resistance"},
    {id: 57, stat: "PVP Power"},
    {id: 59, stat: "Multistrike"},
    {id: 60, stat: "Readiness"},
    {id: 61, stat: "Speed"},
    {id: 62, stat: "Leech"},
    {id: 63, stat: "Avoidence"},
    {id: 64, stat: "Indestructible"},
    {id: 65, stat: "WOD_5"},
    {id: 66, stat: "WOD_6"},
    {id: 71, stat: "Strenght, Agility, Intelect"},
    {id: 72, stat: "Strenght, Agility"},
    {id: 73, stat: "Agility, Intelect"},
    {id: 74, stat: "Strenght, Intelect"}
];

function statMapping(itemID) {
    for(let i in STATS) {
        let mappedStatID = STATS[i].id,
            mappedStatName = STATS[i].stat;

        if(itemID === mappedStatID) {
            return mappedStatName;
        }
    }
}

function renderStats(item) {
    for (let i in item.stats) {
        
        let stats = item.stats[i].stat,
            statAmount = item.stats[i].amount;

        console.log(statMapping(stats) + ": " + statAmount);
        
    }
}

// Raids
//////////////////////////////////////

const RAID_TOS_ITEMS = [
    {id: 116407, name: "Harjatan", items: [
        147020,
        147071,
        147100,
        147002,
        147045,
        147109,
        147092,
        147000,
        147037,
        147029,
        146994,
        147043,
        147067,
        147135,
        147141,
        147159,
        147177,
        147164,
        147182,
        147146,
        147189,
        147129,
        147171,
        147153,
        147123
    ]}
];

function getBossItems(boss, id) {
    for (let i in RAID_TOS_ITEMS) {

        let bossId = RAID_TOS_ITEMS[i].id,
            bossItems = RAID_TOS_ITEMS[i].items;
        
        if(boss === bossId) {
            console.log(bossItems);
        }

    }
}

getBossItems(116407);

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

class bossItems {

    constructor(element) {
        this.element = element;
    }

}

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

            renderStats(item);

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
                console.log('Could not find character ' + error.message);
            });

    }

    init() {
        this.formCharacter.addEventListener("submit", this.fetchData.bind(this));
    }
    
}

const app = document.querySelector(".app");
new characterItems(app);