const CHOICES = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let playerChoiceHistory = [];
const output = document.querySelector('#output');
output.textContent = 'Rock, paper, or scissors?';
const playerScoreDisp = document.querySelector('#player-score');
const computerScoreDisp = document.querySelector('#computer-score');

function getComputerChoice() {

	let computerChoice;

  if (playerChoiceHistory.length === 0) {
    return CHOICES[Math.floor(Math.random() * 3)];;
  } else {
    const choiceMode = mode(playerChoiceHistory);
    if (choiceMode === 'rock') {
      return 'paper';
    } else if (choiceMode === 'paper') {
      return 'scissors';
    } else if (choiceMode === 'scissors') {
      return 'rock';
    }
  }

	return computerChoice;

}

function playRound(playerSelection) {

	const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.']
	let result = '';
  let computerSelection = getComputerChoice();
  playerChoiceHistory.push(playerSelection);

	if (computerSelection === 'rock') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[2];
				break;
			case 'paper':
				result = GAME_RESULTS[0];
        playerScore++;
				break;
			case 'scissors':
				result = GAME_RESULTS[1];
        computerScore++;
				break;
			default:
				return 'You did not choose, or you entered an invalid input.';
		}
	} else if (computerSelection === 'paper') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[1];
        computerScore++;
				break;
			case 'paper':
				result = GAME_RESULTS[2];
				break;
			case 'scissors':
				result = GAME_RESULTS[0];
        playerScore++;
				break;
			default:
				return 'You did not choose, or you entered an invalid input.';
		}
	} else if (computerSelection === 'scissors') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[0];
        playerScore++;
				break;
			case 'paper':
				result = GAME_RESULTS[1];
        computerScore++;
				break;
			case 'scissors':
				result = GAME_RESULTS[2];
				break;
			default:
				return 'You did not choose, or you entered an invalid input.';
		}
	} else {
		throw new Error('Something went wrong, somehow the computer didn\'t make a choice.')
	}

  let gameResult = determineGameWinner();

  if (playerScore === 5 || computerScore === 5) {
    return gameResult;
  } else {
    return `${result} The computer chose ${computerSelection} and you chose ${playerSelection}.`;
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

function mode(array) {
    if(array.length == 0)
        return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++)
    {
        let el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}