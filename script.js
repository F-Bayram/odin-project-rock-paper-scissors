var map = new Map([
    ["Rock", "Paper"],
    ["Paper", "Scissors"],
    ["Scissors", "Rock"]
]);
var arr = ["Rock", "Paper", "Scissors"]
var getComputerChoice = () => {return arr[Math.floor(Math.random() * 3)];}
const buttons = document.querySelectorAll(".rps");
const results = document.querySelector(".results");
const BODY_NODE = document.querySelector("body");
const scores = document.querySelector(".scores");
var currentPlayerScore = 0;
var currentEnemyScore = 0;

function playRound(playerSelection, computerSelection){
    const PLAYER_SCORE = document.querySelector(".scores.player p");
    const ENEMY_SCORE = document.querySelector(".scores.computer p");
    const TEXT = document.createElement("p");
    var outputText = "";
    var textColor = "";

    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substr(1, playerSelection.size).toLowerCase();
    computerSelection = computerSelection.charAt(0).toUpperCase() + computerSelection.substr(1, computerSelection.size).toLowerCase();
    
    // output the result and update the score of round-winner

    if(map.get(playerSelection) == computerSelection){
        outputText = "Computer wins! " + computerSelection + " beats " + playerSelection;
        ENEMY_SCORE.textContent = "Computer: " + ++currentEnemyScore;
        textColor = "lavenderblush";
    }
    else if(computerSelection == playerSelection){
        outputText = "Draw!";
        textColor = "black";
    }      
    else{
        outputText = "Player wins! " + playerSelection + " beats " + computerSelection;
        PLAYER_SCORE.textContent = "Player: " + ++currentPlayerScore;
        textColor = "cornflowerblue";
    }

    TEXT.textContent = outputText;
    TEXT.style.color = textColor;

    return TEXT;
}

function init(e){
    const PLAYER_SCORE = document.querySelector(".scores.player p");
    const ENEMY_SCORE = document.querySelector(".scores.computer p");

    currentPlayerScore = 0, currentEnemyScore = 0;
    PLAYER_SCORE.textContent = "Player: " + currentPlayerScore;
    ENEMY_SCORE.textContent = "Computer: " + currentEnemyScore;
    buttons.forEach(btn => {
        btn.addEventListener("click", pickAnimation);
        btn.classList.add("animation");
    });
    BODY_NODE.style.backgroundColor = "lightslategray";
    BODY_NODE.removeChild(document.querySelector("#endScene"));
}

function pickAnimation(e){
    // variables
    const playersPick = e.target.parentNode.getAttribute("data-selection");
    const enemiesPick = getComputerChoice().toLowerCase();
    const playerCard = document.querySelector(`.rps[data-selection=${playersPick}]`);
    const enemyCard =  document.querySelector(`.rps[data-selection=${enemiesPick}]`);

    // color cards
    playerCard.style.backgroundColor = "cornflowerblue";
    enemyCard.style.backgroundColor = "lavenderblush";

    // returns text node with output-text and corresponding text-color
    const TEXT = playRound(playersPick, enemiesPick);
    // creating div for putting the text in there
    const textField = document.createElement("div");
    textField.style.height = "150px";
    textField.style.width = "1000px";
    textField.style.position = "absolute";
    textField.style.top = "50px";
    textField.style.left = "600px";
    textField.appendChild(TEXT);
    scores.appendChild(textField);
    // uncolor
    buttons.forEach(b => b.removeEventListener("click", pickAnimation));
    setTimeout(() => {
        buttons.forEach(b => b.addEventListener("click", pickAnimation));
        playerCard.style.backgroundColor = "indianred";
        enemyCard.style.backgroundColor = "indianred";
        scores.removeChild(textField)
    }, 2000);
    // check if a score == 5 => end-screen
    if (currentPlayerScore >= 5 || currentEnemyScore >= 5)
        endMenue();
}

function endMenue(){
    setTimeout(() => {
        buttons.forEach(btn => {
            btn.removeEventListener("click", pickAnimation);
            btn.classList.remove("animation");
        });
    }, 2000);
    
    BODY_NODE.style.backgroundColor = "#3c3c3c";
    const BTN_REPLAY = document.createElement("button");
    BTN_REPLAY.setAttribute("id", "endScene")
    BTN_REPLAY.textContent = "Play again!";
    BTN_REPLAY.style.position = "absolute";
    BTN_REPLAY.style.fontSize = "120px";
    BTN_REPLAY.style.transform = "translate(800px, -300px)";
    BTN_REPLAY.addEventListener("click", init);
    BODY_NODE.appendChild(BTN_REPLAY);
}

buttons.forEach(btn => {
    btn.addEventListener("click", pickAnimation);
});