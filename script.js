// define ".card" as cards
const cards = document.querySelectorAll(".card");

let hasFlippedCard = false; //card which is already flipped. Beginning is not flipped (means false)
let first, second;
let lockBoard = false; //lock to flip already-found cards


function flipCard(){
    if (lockBoard) return; //if it's already locked, no action
    if(this === first) return; // if it's same as first clicked card, no action

    this.classList.add("flip");

    if (!hasFlippedCard){
        hasFlippedCard = true;
        first = this;
        return;
    }
    second = this;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = first.dataset.face === second.dataset.face;
    isMatch ? disableCards() : unflipCards(); // if it's match => disableCards
}

function disableCards(){
    first.removeEventListener("click", flipCard);
    second.removeEventListener("click",flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        first.classList.remove("flip"); //reset flip
        second.classList.remove("flip");

        resetBoard();
    }, 1500);
}

//reset the chosen cards
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]; 
    [first,second] = [null, null];
}

//shuffle cards
(function shuffle(){
    cards.forEach(card => {
        let newPosition = Math.floor(Math.random() *24);
        card.style.order = newPosition;
    });
})();


// click and flip
cards.forEach(card => card.addEventListener("click", flipCard));



//sound effect
let bleep = new Audio();
bleep.src = "mixkit-light-saber-sword-1708.wav";
function playBtnSound(num){
    bleep.play();
}
