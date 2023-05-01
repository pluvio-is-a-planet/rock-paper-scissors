const CHOICES = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let playerChoiceHistory = [];
const output = document.querySelector('#output');
output.textContent = 'Rock, paper, or scissors?';
const playerScoreDisp = document.querySelector('#player-score');
const computerScoreDisp = document.querySelector('#computer-score');
let computerChoice;
let consecutiveRoundTies = 0;

function getComputerChoice() {

  const strategies = [playDefensive, playAggressive, playCounter, playRandom];
  const randomIndex = Math.floor(Math.random() * strategies.length);
  const lastChoice = playerChoiceHistory[playerChoiceHistory.length - 1];
  if (consecutiveRoundTies >= 2) {
    const randomAggressive = [1, 3]; // indeces of playAggressive and playRandom functions in strategies
    const randomIndex = Math.floor(Math.random() * randomAggressive.length);
    consecutiveRoundTies = 0;
    return strategies[randomAggressive[randomIndex]](lastChoice);
  } else {
    return (playerChoiceHistory.length > 0) ?
    strategies[randomIndex](lastChoice) :
    playRandom();
  }
s
}

function playRound(playerSelection) {
  const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.'];
  let resultIndex;
  let computerSelection = getComputerChoice(playerSelection);
  playerChoiceHistory.push(playerSelection);
  console.log(`Player Choices: ${playerChoiceHistory.join(', ')}`);

  switch (playerSelection) {
    case 'rock':
      resultIndex = computerSelection === 'scissors' ? 0 : computerSelection === 'paper' ? 1 : 2;
      break;
    case 'paper':
      resultIndex = computerSelection === 'rock' ? 0 : computerSelection === 'scissors' ? 1 : 2;
      break;
    case 'scissors':
      resultIndex = computerSelection === 'paper' ? 0 : computerSelection === 'rock' ? 1 : 2;
      break;
    default:
      return 'You did not choose, or you entered an invalid input.';
  }

  if (resultIndex === 0) {
    consecutiveRoundTies = 0;
    playerScore++;
  } else if (resultIndex === 1) {
    consecutiveRoundTies = 0;
    computerScore++;
  } else consecutiveRoundTies++;

  let gameResult = determineGameWinner();

  if (playerScore === 5 || computerScore === 5) {
    return gameResult;
  } else {
    return `${GAME_RESULTS[resultIndex]} The computer chose ${computerSelection} and you chose ${playerSelection}.`;
  }
}


const selectBtns = document.querySelectorAll('#btn');

selectBtns.forEach((selectBtn) => {
	selectBtn.addEventListener('click', (e) => {
    
    if (playerScore < 5 && computerScore < 5) {
      let playerChoice = selectBtn.className;
      let roundResult = playRound(playerChoice);

      output.textContent = roundResult;
      playerScoreDisp.textContent = `Player: ${playerScore}`;
      computerScoreDisp.textContent = `Computer: ${computerScore}`;
    } else {

      if (confirm('Do you want to play again?')) {
        playerScore = 0;
        computerScore = 0;
        output.textContent = 'Rock, paper, or scissors?';
        playerScoreDisp.textContent = `Player: ${playerScore}`;
        computerScoreDisp.textContent = `Computer: ${computerScore}`;
      } else {
        alert('Thank you for playing!');
      }
      
    }

  });
});

function determineGameWinner() {
  if (playerScore === 5) {
    return 'Player wins! Game over. B^)';
  } else if (computerScore === 5) {
    return 'Computer Wins... You lose. Game over. :^(';
  }
}

function findMostCommon(arr) {
  let freqMap = {};
  let mostCommon = arr[0];

  arr.forEach(function (elem) {
    if (freqMap[elem]) {
      freqMap[elem]++;
    } else {
      freqMap[elem] = 1;
    }
    if (freqMap[elem] > freqMap[mostCommon]) {
      mostCommon = elem;
    }
  });

  return mostCommon;
}

const counterMoves = {
  rock: ['rock', 'paper', 'scissors'],
  paper: ['paper', 'scissors', 'rock'],
  scissors: ['scissors', 'rock', 'paper'],
}

function playDefensive(playerChoice) {
  console.log('Please don\'t bully me. (Defensive)');
  const randomIndex = Math.floor(Math.random() * 2);
  const mostCommon = findMostCommon(playerChoiceHistory);
  const choicesCount = playerChoiceHistory.reduce((choicesCount, choice) => {
    choicesCount[choice] = ++choicesCount[choice] || 1;

    return choicesCount;
  }, {});

  if (choicesCount[mostCommon] > 1 && computerScore >= playerScore) {
    computerChoice = counterMoves[playerChoice][0];
  } else {
    computerChoice = counterMoves[playerChoice][randomIndex];
  }

  console.log(`Computer prediction: ${computerChoice}`);
  return computerChoice;
}

function playAggressive(playerChoice) {
  console.log('Get fucked you nerd. (Aggressive)');
  const randomIndex = Math.floor(Math.random() * 2);
  const cpuChoiceHistory = playerChoiceHistory.slice(1);
  const playerLastChoice = playerChoiceHistory[playerChoiceHistory.length - 1];
  const cpuLastChoice = cpuChoiceHistory[cpuChoiceHistory.length - 1];
  const playerScoreDiff = playerScore - computerScore;
  let choiceIndex;

  if (isPlayerAggressive(playerChoiceHistory)) {
    if (playerScoreDiff > 0) {
      choiceIndex = 1;
    } else if (playerScoreDiff < 0) {
      choiceIndex = 0;
    } else {
      choiceIndex = randomIndex + 1;
    }
  } else {
    if (cpuLastChoice === playerLastChoice) {
      choiceIndex = randomIndex + 1;
    } else {
      const counterMoveIndex = counterMoves[playerLastChoice].indexOf(cpuLastChoice);
      choiceIndex = (counterMoveIndex + 2) % 3;
    }
  }

  computerChoice = counterMoves[playerChoice][choiceIndex];
  console.log(`Computer prediction: ${computerChoice}`);
  return computerChoice;
}

function playCounter(playerChoice) {
  console.log('Get countered. (Counter)')
  const mostCommon = findMostCommon(playerChoiceHistory);
  const choicesCount = playerChoiceHistory.reduce((choicesCount, choice) => {
    choicesCount[choice] = ++choicesCount[choice] || 1;

    return choicesCount;
  }, {});

  if (choicesCount[mostCommon] > 1) {
    computerChoice = counterMoves[playerChoice][1];
  } else {
    computerChoice = counterMoves[playerChoice][0];
  }

  console.log(`Computer prediction: ${computerChoice}`);
  return computerChoice;
}

function isPlayerAggressive(arr) {
  const mostCommon = findMostCommon(playerChoiceHistory);
  const choicesCount = arr.reduce((choicesCount, choice) => {
    choicesCount[choice] = ++choicesCount[choice] || 1;

    return choicesCount;
  }, {});

  return (choicesCount[mostCommon] > 1);
}

function playRandom() {
  console.log('I\'m feeling a little crazy today. (Random)');
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
}