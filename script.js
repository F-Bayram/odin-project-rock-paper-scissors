var map = new Map([
    ["Rock", "Paper"],
    ["Paper", "Scissors"],
    ["Scissors", "Rock"]
]);
var arr = ["Rock", "Paper", "Scissors"]
var getComputerChoice = () => {return arr[Math.floor(Math.random() * 3)];}

function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substr(1, playerSelection.size).toLowerCase();
    computerSelection = computerSelection.charAt(0).toUpperCase() + computerSelection.substr(1, computerSelection.size).toLowerCase();

    const OUTPUT_TEXT = map.get(playerSelection) == computerSelection ? "You Lose! " + computerSelection + " beats " + playerSelection :
    computerSelection == playerSelection ? "Draw!" : "You Win! " + playerSelection + " beats " + computerSelection;

    return OUTPUT_TEXT;
}

function game(){
    for (let i = 0; i < 5; i++){
        const playerSelection = prompt();
        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));
    }
}

game();