const CHOICES = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
const output = document.querySelector('#output');
const playerScoreDisp = document.querySelector('#player-score');
const computerScoreDisp = document.querySelector('#computer-score');

// function to get the randomly chosen computer choice
// choice is selected in an array of options,
// using the index of the array and the Math.random and Math.floor functions
function getComputerChoice() {

	let computerChoice = CHOICES[Math.floor(Math.random() * 3)];

	return computerChoice;

}

// function that plays a round of rock, paper, scissors
// take parameters for the computer and player's choices
// add check to see which player wins and return the appropriate string
// test player's choice against computer's choice in switch case statements
// nested inside if else statements
function playRound(playerSelection) {

	// array to contain the result of each scenario
	const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.']
	let result = '';

  let computerSelection = getComputerChoice();

	// playerSelection = playerSelection.toLowerCase(); // Allows the player to input their answer in any case.

	// testing if/switch case block
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
	} // This error only occurs if the computer didn't get a selection, very unlikely to occur

  let gameResult = determineGameWinner();
	// Build a string displaying the result of the game
	// Return the result to use in game() function
  if (playerScore === 5 || computerScore === 5) {
    if (confirm('Do you want to play again?')) {
      playerScore = 0;
      computerScore = 0;
    } else {
      alert('Thank you for playing!');
    }
    return gameResult;
  } else {
    return `${result} The computer chose ${computerSelection} and you chose ${playerSelection}.`;
  }

}

const selectBtns = document.querySelectorAll('#btn');

selectBtns.forEach((selectBtn) => {
	selectBtn.addEventListener('click', (e) => {
    
    // Plays the game only while both scores are under 5
    // Grab player's choice from the targeted button
    // Then store the result of the playround() function which is being called with the player's choice passed
    // as an argument
    if (playerScore < 5 && computerScore < 5) {
      let playerChoice = selectBtn.className;
      let roundResult = playRound(playerChoice);

      output.textContent = roundResult;
      playerScoreDisp.textContent = `Player: ${playerScore}`;
      computerScoreDisp.textContent = `Computer: ${computerScore}`;
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