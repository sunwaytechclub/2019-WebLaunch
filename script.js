const NAME = "Master";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab' 

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "Studies",
        "items":[
            {"name": "Item A", "shortcutKey": "q", "url": "https://google.com/?q=q"},
            {"name": "Item B", "shortcutKey": "w", "url": "https://google.com/?q=w"},
            {"name": "Item C", "shortcutKey": "e", "url": "https://google.com/?q=e"}
        ]
    },
    {
        "groupName": "Work",
        "items":[
            {"name": "Item D", "shortcutKey": "a", "url": "https://google.com/?q=a"},
            {"name": "Item E", "shortcutKey": "s", "url": "https://google.com/?q=s"},
            {"name": "Item F", "shortcutKey": "d", "url": "https://google.com/?q=d"}
        ]
    },
    {
        "groupName": "Personal",
        "items":[
            {"name": "Item I", "shortcutKey": "z", "url": "https://google.com/?q=z"},
            {"name": "Item J", "shortcutKey": "x", "url": "https://google.com/?q=x"},
            {"name": "Item K", "shortcutKey": "c", "url": "https://google.com/?q=c"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours(); // returns the hour (from 0 to 23)
    // curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    // if (curHours == 4) curHours = 3;

    if (curHours >= 0 && curHours < 6) {
        curHours = 0;
    }
    if (curHours >= 6 && curHours < 12) {
        curHours = 1;
    }
    if (curHours >= 12 && curHours < 18) {
        curHours = 2;
    }
    if (curHours >= 18 && curHours < 24) {
        curHours = 3;
    }

    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function animateGroups() {
    var groupOne = document.getElementById('groupOne');
    var groupTwo = document.getElementById('groupTwo');
    var groupThree = document.getElementById('groupThree');

    setTimeout(function(){
        groupOne.classList.add("active");
    }, 500);
    
    setTimeout(function(){
        groupTwo.classList.add("active");
    }, 1000);
    
    setTimeout(function(){
        groupThree.classList.add("active");
    }, 1500);

}

function main(){
    setupWelcomeMessage();
    animateGroups();
    // setupGroups();
    document.addEventListener('keyup', shortcutListener, false);

}

main();
