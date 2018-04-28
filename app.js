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

function getBossItems(boss) {
    for (let i in RAID_TOS_ITEMS) {

        let bossId = RAID_TOS_ITEMS[i].id,
            bossItems = RAID_TOS_ITEMS[i].items;
        
        if(boss === bossId) {
            return bossItems;
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
                        `https://wow.zamimg.com/images/wow/icons/large/${itemData.IMAGE}.jpg`
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
        this.wrap = this.element.querySelector("#mainContent");
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

// Organize Trinkets
//////////////////////////////////////

class characterGear {

    constructor(element) {
        this.element = element;
        this.formSimcGear = this.element.querySelector("#formSimcGear");
        this.gearList = this.element.querySelector("#simcGear");
        this.trinketString = this.element.querySelector("#trinketString");
        this.init();
    }

    getGear(event) {

        event.preventDefault();
        
        // Trinket String
        //let dirtyTrinkets = "# Kil'jaeden's Burning Wish (1000)# trinket1=,id=144259,bonus_id=1811/3630## Engine of Eradication (915)# trinket1=,id=147015,bonus_id=3562/1497/3528## Royal Dagger Haft (895)# trinket1=,id=140791,bonus_id=3444/1492/3336## Animated Exoskeleton (920)# trinket1=,id=140789,bonus_id=3445/1517/3337## Darkmoon Deck: Immortality (900)# trinket1=,id=128711,bonus_id=689/601/679## Infernal Contract (905)# trinket1=,id=140807,bonus_id=3517/1502/3336## Horn of Valor (910)# trinket1=,id=133642,bonus_id=3573/1562/3528## Doomed Exarch's Memento (925)# trinket1=,id=153172,bonus_id=41/3573/1517/3337## Beguiler's Talisman (910)# trinket1=,id=147275,bonus_id=604/3573/3159/3528## Vial of Ceaseless Toxins (910)# trinket1=,id=147011,bonus_id=3573/1492/3528## Beguiler's Talisman (915)# trinket1=,id=147275,bonus_id=607/3573/3164/3336## Forgefiend's Fabricator (940)# trinket1=,id=151963,bonus_id=3610/1482/3336## Beguiler's Talisman (860)# trinket1=,id=147275,bonus_id=605/1808/3574/1652/3336";

        let dirtySimc = this.gearList.value.toString();

        //console.log(dirtySimc);

        let dirtyGear = dirtySimc.substring(dirtySimc.indexOf("### Gear from Bags") + 18, dirtySimc.length).replace(/\r?\n/g, '');

        //console.log(dirtyGear);

        let splitGear = dirtyGear.split('#');

        let bagGear = splitGear.filter(gear => gear.length > 0),
            cleanGear = bagGear.map(gear => gear.trim());

        //console.log(cleanTrinkets);

        const toMatrix = (arr, width) => 
            arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows, []);

        let allGear = toMatrix(cleanGear, 2);

        //console.log(allGear);
        let gearStats = [];
        let gearNames = [];
        for(let i=0; allGear.length > i; ++i){
            gearStats.push(allGear[i][1]);
            gearNames.push(allGear[i][0].replace(/ /g, '_'));
        }

        console.log(gearStats);
        console.log(gearNames);

        let gearHead = [],
            gearNeck = [],
            gearShoulder = [],
            gearBack = [],
            gearChest = [],
            gearWrist = [],
            gearHands = [],
            gearWaist = [],
            gearLegs = [],
            gearFeet = [],
            gearFinger = [],
            gearTrinket = [];

        let dirtyTrinketVariations = [];
        for(let i=0; trinketStats.length > i; ++i) {
            for(let j=0; trinketStats.length > j; ++j) {
                if(trinketStats[i] != trinketStats[j]){
                    dirtyTrinketVariations.push(trinketStats[i]);
                    dirtyTrinketVariations.push(trinketStats[j].replace('trinket1', 'trinket2'));
                    dirtyTrinketVariations.push('name=' + trinketNames[i].concat('_', trinketNames[j]));
                }
            }
        }

        //console.log(dirtyTrinketVariations);

        let trinketVariations = toMatrix(dirtyTrinketVariations, 3);

        //console.log(trinketVariations);

        let trinketString = '';

        for(let i=0; trinketVariations.length > i; ++i){
            trinketString += trinketVariations[i][0] + '\n';
            trinketString += trinketVariations[i][1] + '\n';
            trinketString += trinketVariations[i][2] + '\n';
            trinketString += '\n';
        }

        //console.log(trinketString);

        //this.trinketString.innerHTML = trinketString;

    }

    init() {
        this.formSimcGear.addEventListener("submit", this.getGear.bind(this));
    }

}

const app = document.querySelector(".app");
new characterItems(app);
new characterGear(app);