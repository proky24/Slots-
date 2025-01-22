const iconWidth = 79;
const iconHeight = 79;
const numIcons = 9;
const iconsMap = [
    "seven",
    "banana",
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

function spin(card, offset  ) {
    const random = (offset + 2) * numIcons + Math.floor(Math.random() * numIcons);
    const style = getComputedStyle(card);
        const backgroundPositionY = parseFloat(style["background-position-y"]);
        const targetbackgroundPositionY = backgroundPositionY + random * iconHeight;

    card.style.transition = `background-position-y ${8 + random * iconInterval}ms`;
    card.style.backgroundPositionY = `${targetbackgroundPositionY + random * iconHeight}px`;

}

function spinAll() {
    const cardsList = document.querySelectorAll(".card");

    [... cardsList].map((card, index) => {
        spin(card, index)})
}
