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
var correct = [];
var wrong = [];
var match = [];
var letterNum = [];
var wordChoice = Math.floor(Math.random() * words.length);
//var wordChoice = 9;
var word = words[wordChoice];


//functions
//==========================================================================
function addGuess(x) {
    letters.push(x);
    docGuesses.textContent = letters;
    wrongLetter();
    return letters;
}

function alreadyThere(x) {
    docConversation.textContent = "You already guessed " + x + " !";
}

function wrongLetter() {
    wrong.push("x");
    var y = wrong.length;
    docWrongGuess.textContent = y + "/5 wrong guesses"
    if (y >= 5) {
        endGame();
    }
}

function endGame() {
    docConversation.textContent = "You lost :(";
    revealWord();
}

function revealWord() {
    for (i = 0; i < word.length; i++) {
        if (word[i] == " ") {
            var letter = document.createElement("div");
            letter.setAttribute("Id", "letter");
            docWord.appendChild(letter);
        }
        else {
            var z = word[i];
            var y = document.getElementById("letter" + i);
            y.textContent = z;
        }
    }
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

function checkCorrect(x) {
    if (correct.length > 0) {
        for (i = 0; i < correct.length; i++) {
            if (x == correct[i]) {
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
    docWrongGuess.textContent = "0/5 wrong guesses";
    return word;
}

function keyCheck(x) {
    var z = x.keyCode;
    if ((z >= 65) && (z <= 90)) {
        return true;
    }
    else {
        docConversation.textContent = "Guess the word! Type a LETTER."
        return false;
    }
}

function checkGuess(x) {
    for (i = 0; i < word.length; i++) {
        if (x == word[i]) {
            match.push(i);
        } else {
            continue;
        }
    }
    return match;
}

function appendMatch(x) {
    if (match.length > 0) {
        for (i = 0; i < match.length; i++) {
            var z = match[i]
            var y = document.getElementById("letter" + z);
            y.textContent = x;
            correct.push(x);
        }
    } else {
        addGuess(x);
    }
    match = [];
    return correct;
}

function checkEnd(x) {
    if (correct.length == letterNum.length) {
        docConversation.textContent = "YOU WON!";
        docGuesses.textContent = "";
        docWrongGuess.textContent = "";
    }
}

function numberLetters(x) {
    for (i = 0; i < x.length; i++) {
        if (x[i] == " ") {
            continue;
        } else {
            letterNum.push(i);
        }
    }
    return letterNum;
}

function main(x) {
    docConversation.textContent = message1;
    var y = x.key;
    if (keyCheck(x)) {
        if (checkDup(y)) {
            alreadyThere(y);
        } else if (checkCorrect(y)) {
            alreadyThere(y);
        } else {
            checkGuess(y);
            appendMatch(y);
            checkEnd(y);
        }
        console.log("correct length: " + correct.length);
        console.log("letterNum length: " + letterNum.length);
    }
}



//game
//==========================================================================
document.addEventListener("keyup", function () { main(event); });
docConversation.textContent = message1;
numberLetters(word);
initializeGame(word);

