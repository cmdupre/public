function getComputerChoiceString()
{
    let choice = Math.floor(Math.random() * 3);

    if (choice === 0) return "Rock";
    if (choice === 1) return "Paper";
    return "Scissors";
}

function getPlayerChoiceString()
{
    // return hardcoded player choice for unit tests
    if (typeof window !== undefined)
    {
        return "TestValue";
    }

    return capitalize(prompt("Rock, Paper, or Scissors?"));
}

function capitalize(str)
{
    return typeof str !== "string" || str.length < 1
        ? str 
        : str.charAt(0).toUpperCase() + str.substring(1);
}

function checkPlayerWins(playerChoice, computerChoice)
{
    // player loses for invalid choice
    if (playerChoice !== "Rock" && playerChoice !== "Paper" && playerChoice !== "Scissors")
    {
        return false;
    }

    // tie game
    if (playerChoice === computerChoice)
    {
        return null;
    }

    // rock beats scissors, paper beats rock, scissors beat paper
    return (playerChoice === "Rock" && computerChoice === "Scissors") ||
           (playerChoice === "Paper" && computerChoice === "Rock") ||
           (playerChoice === "Scissors" && computerChoice === "Paper");
}

function logResult(result, playerChoice, computerChoice)
{
    let newResult = document.createElement('p');
    divResults.appendChild(newResult);

    if (result === null)
    {
        newResult.textContent = "Tie round!";
        return;
    }

    result ? playerWins++ : computerWins++;

    newResult.textContent = `You ${result ? "WIN" : "LOSE"}! ${result ? playerChoice : computerChoice} beats ${result ? computerChoice : playerChoice}`;
    spanPlayerScore.textContent = playerWins;
    spanComputerScore.textContent = computerWins;
}

function playRound(playerChoice, computerChoice)
{
    const result = checkPlayerWins(playerChoice, computerChoice);

    logResult(result, playerChoice, computerChoice);
}

let playerWins = 0;
let computerWins = 0;

const divSelection = document.querySelector('#selection');
const divResults = document.querySelector('#results');
const spanPlayerScore = document.querySelector('#playerScore');
const spanComputerScore = document.querySelector('#computerScore');

const playerButtonRock = document.createElement('button');
const playerButtonPaper = document.createElement('button');
const playerButtonScissors = document.createElement('button');

const rockString = 'Rock';
const paperString = 'Paper';
const scissorsString = 'Scissors';

playerButtonRock.textContent = rockString;
playerButtonPaper.textContent = paperString;
playerButtonScissors.textContent = scissorsString;

playerButtonRock.addEventListener('click', () => playRound(rockString, getComputerChoiceString()));
playerButtonPaper.addEventListener('click', () => playRound(paperString, getComputerChoiceString()));
playerButtonScissors.addEventListener('click', () => playRound(scissorsString, getComputerChoiceString()));

divSelection.appendChild(playerButtonRock);
divSelection.appendChild(playerButtonPaper);
divSelection.appendChild(playerButtonScissors);

module.exports = { 
    getComputerChoiceString,
    getPlayerChoiceString,
    capitalize,
    checkPlayerWins
};