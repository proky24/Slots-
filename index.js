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
const messageContainer = document.getElementById("snackbar");
const audioBtn = document.getElementById("audio");

body.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        spinAll();
    }
})

p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;

const backgroudMusic = new Audio('jazz.mp3');
const slotAudio = new Audio('slotserunato.mp3');


backgroudMusic.play();
backgroudMusic.loop = true;
backgroudMusic.volume = 0.3;

function audio() {
    if(backgroudMusic.volume === 0) {
        backgroudMusic.volume = 0.3;
        slotAudio.volume = 0.5;
        audioBtn.innerHTML = "🔊";
    } else {
        backgroudMusic.volume = 0;
        slotAudio.volume = 0;
        audioBtn.innerHTML = "🔇";
    }
}

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
    /*  messageContainer.style.visibility = 'hidden';
    message.innerHTML = ""; */
    const cardsList = document.querySelectorAll(".cards > .card");
    slotAudio.play();
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
            const moneyWin = bet * 10;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                document.getElementById("win").style.visibility = 'visible';
                combo.innerHTML = "10x Combo❗";

            }, 1000)
        } else if (wins[0] === "banana") {
            const moneyWin = bet * 5;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "5x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "cherry") {
            const moneyWin = bet * 3;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "3x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "plum") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "orange") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "bell") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "bar") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "lemon") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        } else if (wins[0] === "melon") {
            const moneyWin = bet * 2;
            ballance += moneyWin;
            messageContainer.innerHTML = `You won <span style="color:green;">${bet}$</span>`;
            messageContainer.className = "show";
            setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
            setTimeout(() => {
                messageContainer.style.visibility = 'hidden';
                messageContainer.innerHTML = "";
                combo.innerHTML = "2x Combo❗";
                document.getElementById("win").style.visibility = 'visible';

            }, 1000)
        }
        document.getElementById("ballance").innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
    } else {
        /*messageContainer.style.visibility = 'visible';
        message.innerHTML = `You lost <span style="color:red;">${bet}$</span>`;*/
        messageContainer.innerHTML = `You lost <span style="color:red;">${bet}$</span>`;
        messageContainer.className = "show";
        setTimeout(function(){ messageContainer.className = messageContainer.className.replace("show", ""); }, 1500);
        ballance -= bet;
        document.getElementById("ballance").innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`;
        checkBallance();
        console.log('checked ballance')
    }
    wins = [];
}


function checkBallance() {
    if(ballance <= 0){
        p.innerHTML = `Current balance:<span style="color:red;"> ${ballance}$</span>`;
        setTimeout(() => {
            
            document.getElementById("debt").style.visibility = 'visible';
            console.log('debt showed')
            
        }, 1200)
        return true;
    } else {
        document.getElementById("debt").style.visibility = 'hidden';
        console.log('debt not showed')

        return false;
    }
}

button.addEventListener("click", () => {
    bet += 100; 
    if(bet === ballance) {
        return;
    } else {
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        if(!checkBallance()) {
            ballance -= 100; p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
        }
    }
});

lower.addEventListener("click", () => {
    if(bet === ballance){
        bet -=100;
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
    } if(bet === 100){
        return;
    }else {
        bet -= 100;
        ballance += 100;         
        betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span>`;
        p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
    }
});

submit.addEventListener("click", () => {
    ballance += parseInt(document.getElementById("sum").value); 
    p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span>`; 
    bet = 100;
    betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span`;
    document.getElementById("sum").value = "";
    document.getElementById("debt").style.visibility = 'hidden'; 
});

cross.addEventListener("click", () => {win.style.visibility = 'hidden';});

allIn.addEventListener("click", () => {
    bet = ballance; 
    betMoney.innerHTML = `Current bet:<span style="color:green;"> ${bet}$</span`;
    ballance = 0;
    p.innerHTML = `Current balance:<span style="color:green;"> ${ballance}$</span`;
});