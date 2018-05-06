//variables
//=========================================================================
var docGuesses = window.document.getElementById("guessedLetters");
var docConversation = window.document.getElementById("conversation");
var docWrongGuess = window.document.getElementById("wrongGuess");
var docWord = window.document.getElementById("setup");

var message1 = "Guess the word! Type a letter."

var words = [
    "plant", "fertilizer", "potting soil", "gnats", "flower",
    "vine", "palm", "chlorophyll", "oxygen", "carbon dioxide", "terra cotta"
];
var letters = [];
var wrong = [];
var match = [];
//var wordChoice = Math.floor(Math.random() * words.length);
var wordChoice = 9;
var word = words[wordChoice];


//functions
//==========================================================================
function addGuess(x) {
    letters.push(x);
    docGuesses.textContent = letters;
    wrongLetter();
}

function alreadyThere(x) {
    docConversation.textContent = "You already guessed " + x + " !";
}

function wrongLetter() {
    wrong.push("x");
    var y = wrong.length;
    docWrongGuess.textContent = y + "/10 wrong guesses"
    if (y >= 10) {
        endGame();
    }
}

function endGame() {
    docConversation.textContent = "You lost :(";
}

function checkDup(x) {
    if (letters.length > 0) {
        for (i = 0; i < letters.length; i++) {
            if (x == letters[i]) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    }
    else {
        return false;
    }
}

function initializeGame(word) {
    for (i = 0; i < word.length; i++) {
        if (word[i] == " ") {
            var letter = document.createElement("div");
            letter.setAttribute("Id", "letter");
            docWord.appendChild(letter);
        }
        else {
            var letter = document.createElement("div");
            var underscore = document.createTextNode("_");
            letter.appendChild(underscore);
            letter.setAttribute("class", "letter");
            letter.setAttribute("Id", "letter" + i);
            docWord.appendChild(letter);
        }
    }
    docWrongGuess.textContent = "0/10 wrong guesses";
    return word;
}

function keyCheck(x){
    var z = x.keyCode;
    if ((z >= 65) && (z <= 90)){
        return true;
    }
    else {
        docConversation.textContent = "Guess the word! Type a LETTER."
        return false;        
    } 
}

function checkGuess(x) {
    for (i = 0; i < word.length; i++) {
        if (x == word[i]){
            match.push(i);
        } else {
            continue;
        }
    }
    for (i = 0; i < match.length; i++) {
        var z = match[i]
        var y = document.getElementById("letter" + z);
        y.textContent = x;
    } 
    addGuess(x);
    match = [];

}

function main(x) {
    docConversation.textContent = message1;
    var y = x.key;
    if (keyCheck(x)) {
        if (checkDup(y)) {
            alreadyThere(y);
        } else {
            checkGuess(y);
        }
    }
}



//game
//==========================================================================
document.addEventListener("keyup", function () { main(event); });
docConversation.textContent = message1;
initializeGame(word);
