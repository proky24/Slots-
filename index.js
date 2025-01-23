const iconWidth = 79;
const iconHeight = 79;
const numIcons = 9;
const iconsMap = [
    "banana",
    "seven",
    "cherry",
    "plum",
    "orange",
    "bell",
    "bar",
    "lemon",
    "melon"
]
const iconInterval = 100;
const indexes = [0,0,0];
let wins = [];
let ballance = 10000;
let bet = 100;
const button = document.getElementById("bet");
const betMoney = document.getElementById("betMoney");   
const lower = document.getElementById("lower");
const cards = document.getElementById("cards");
const body = document.getElementById("body");
const submit = document.getElementById("submit");
const p = document.getElementById("ballance");
const win = document.getElementById("win");
const combo = document.getElementById("combo");
const cross = document.getElementById("cross");
const allIn = document.getElementById("allIn");

body.addEventListener("keydown", (e) => {
    if(e.code === "Space" || e.key === "Enter"){
        spinAll();
        console.log(e.key)
    }
})

p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;

let backgroudMusic = new Audio('jazz.mp3');

backgroudMusic.play();
backgroudMusic.loop = true;
backgroudMusic.volume = 0.1;


function spin(card, offset) {

    const random = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
    const style = getComputedStyle(card);
        const backgroundPositionY = parseFloat(style["background-position-y"]);
        /*const targetbackgroundPositionY = backgroundPositionY + random * iconHeight;*/

    return new Promise((resolve, reject) => {
        
        card.style.transition = `background-position-y ${8 + random * iconInterval}ms`;
        card.style.backgroundPositionY = `${backgroundPositionY + random * iconHeight}px`;


        setTimeout(() => {
            resolve(random%numIcons);
        }, 8 + random * iconInterval);
    })

}

function spinAll() {
    const cardsList = document.querySelectorAll(".cards > .card");
    const audio = new Audio('slotserunato.mp3');
    audio.play();
    backgroudMusic.pause();

    cards.classList.add("casino-background");
    setTimeout(() => {
        cards.classList.remove("casino-background")
    }, 3500);
    

    Promise
        .all([...cardsList].map((card, index) => spin(card, index)))
        
        .then((randoms) => {
            randoms.forEach((random, i) => indexes[i] = (indexes[i] + random) % numIcons);
                indexes.map((index) => { wins.push(iconsMap[index]);}); 
        })

        .then(() => checkWin())
        .then(() => checkBallance())
        .then(() => backgroudMusic.play());
}

function checkWin() {
    const win = wins[0] === wins[1] && wins[1] === wins[2];
    if (win) {
        if (wins[0] === "seven") {
            ballance += bet * 10;
            document.getElementById("win").style.visibility = 'visible';
            combo.innerHTML = "10x Combo❗";
        } else if (wins[0] === "banana") {
            ballance += bet * 5;
            combo.innerHTML = "5x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "cherry") {
            ballance += bet * 3;
            combo.innerHTML = "3x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "plum") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "orange") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "bell") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "bar") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "lemon") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        } else if (wins[0] === "melon") {
            ballance += bet * 2;
            combo.innerHTML = "2x Combo❗";
            document.getElementById("win").style.visibility = 'visible';
        }
        document.getElementById("ballance").innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
    } else {
        ballance -= bet;
        document.getElementById("ballance").innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
    }
    wins = [];
}


function checkBallance() {
    if(ballance <= 0){
        document.getElementById("debt").style.visibility = 'visible';
        p.innerHTML = `Current balance:<span style="color:red;"> ${ballance}$</span>`;
    } else {
        document.getElementById("debt").style.visibility = 'hidden';
    }
}

button.addEventListener("click", () => {
    if(bet === ballance) {
        return;
    } else {
        bet += 100; 
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        ballance -= 100; p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
    }
});

lower.addEventListener("click", () => {
    if(bet === ballance){
        bet -=100;
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
    } else {
        bet -= 100;
        ballance += 100;         
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
    }
});
submit.addEventListener("click", () => {console.log(document.getElementById("sum").value);  ballance += parseInt(document.getElementById("sum").value); p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`; document.getElementById("sum").value = ""; document.getElementById("debt").style.display = 'none'; });

cross.addEventListener("click", () => {win.style.visibility = 'hidden';});

allIn.addEventListener("click", () => {
    bet = ballance; 
    betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span`;
    ballance = 0;
    p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
});