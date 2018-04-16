/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');
let newArrayCards = [...cards];
const deck = document.querySelector('.deck');
let openedCards = [];
let moves = document.querySelector('.moves');
moves.textContent = 0;
let stars = document.querySelector('.stars');
const star1 = document.getElementById('star1');
const star2 = document.getElementById('star2');
const star3 = document.getElementById('star3');
let timer = document.getElementById('timer');
let interval;
let matchedCards = document.getElementsByClassName('match');
let min = 0;
let sec = 0;
let restartBtn = document.querySelector('.restart');
let modal = document.querySelector('#myModal');
let closeBtn = document.querySelector('.close');
const playAgainBtn = document.querySelector('.playAgainBtn');





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 *
 * Start game function
 * 
 */
function startGame() {
    openedCards = [];
    deck.innerHTML = '';
    shuffle(newArrayCards);

    for (const newArrayCard of newArrayCards) {
        deck.appendChild(newArrayCard);
        newArrayCard.classList.remove('open', 'show', 'match', 'disabled');
    }
    resetStars();
    resetMoves();
    restartStopwatch();
}

/*
 *
 * Open function (toggle)
 * 
 */

let openCard = function() {
    this.classList.toggle('open');
    this.classList.toggle('show');
}

/*
 *
 * Main events listeners
 * 
 */
for (const card of cards) {
    card.addEventListener('click', openCard);
    card.addEventListener('click', openCards);
    card.addEventListener('click', openModal);
}

/*
 *
 * Open Card function
 * 
 */
function openCards() {
    openedCards.push(this);
    if (openedCards.length === 1) {
            moveCounter();
        this.classList.add('disabled');
    }else{
        if (openedCards[0].innerHTML != openedCards[1].innerHTML) {
            unmatched();
        }else{
            matched();
        }
    }
}

/*
 *
 *Matched, unmatched
 * 
 */
function matched() {
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
}

function unmatched() {
    disabled();
    setTimeout(function() {
        openedCards[0].classList.remove('open', 'show');
        openedCards[1].classList.remove('open', 'show');
        allow();        
        openedCards = [];
    }, 500);
}

function disabled() {
    for (const newArrayCard of newArrayCards) {
        newArrayCard.classList.add('disabled');
    }
}
 
function allow() {
    for (const newArrayCard of newArrayCards) {
        newArrayCard.classList.remove('disabled');
    }
}

/*
 *
 * MoveCounter function
 * 
 */
function moveCounter() {
    moves.textContent++;
    rating(moves.textContent);
    if (moves.textContent == 1) {
        startStopwatch();
    }   
}


/*
 *
 * Rating function
 * 
 */
function rating(move) {
    if (move >= 17) {
        star2.classList.remove('fa-star');
    }else{
        if (move >= 13 && move < 17) {
            star3.classList.remove('fa-star');
        }
    }
}

/*
 *
 * Stopwatch function
 * 
 */
function stopwatchFunc() {
    timer.innerHTML = `${min} min ${sec} sec`; 
    if (matchedCards.length < 16) {
        if (sec == 60) {
            min++;
            sec = 0;
         }else{
             sec++;
         }
    }else{
        clearInterval(interval);
        }
    }

function startStopwatch() {
    stopwatchFunc();
    interval = setInterval(stopwatchFunc, 1000);
}

/*
 *
 * Reset functions
 * 
 */

 //Reset time

 function restartStopwatch() {
     min = 0;
     sec = 0;
     timer.innerHTML = `${min} min ${sec} sec`
     clearInterval(interval);
 }

 //Reset stars
 function resetStars() {
    if (moves.textContent >= 13 && moves.textContent < 17) {
        star3.classList.add('fa-star');
    }
    if (moves.textContent >= 17) {
        star2.classList.add('fa-star');
        star3.classList.add('fa-star');
    }
 }

 //Reset moves
function resetMoves() {

    moves.textContent = 0;
}

//Restart button function
    restartBtn.addEventListener('click', startGame);

/*
 *
 * Modal
 * 
 */


function openModal() {
    if (matchedCards.length == 16) {
        setTimeout(function() {
            modal.style.cssText = 'display: block';

                let starsFinal = stars.innerHTML;
                document.querySelector('.totalStars').innerHTML = starsFinal;
                document.querySelector('.totalStars').classList.add('inlineStars');

                let movesFinal = moves.innerHTML;
                document.querySelector('.totalMoves').innerHTML = movesFinal;
                
                let timeFinal = timer.innerHTML;
                document.querySelector('.totalTime').innerHTML = timeFinal;

            closeModal();
            playAgain();
        }, 500)
    }
}

function closeModal() {
    closeBtn.addEventListener('click', function() {
        modal.style.cssText = 'display: none';
    })
}

function playAgain() {
    playAgainBtn.addEventListener('click', function() {
        modal.style.cssText = 'display: none';
        startGame();
    })
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
