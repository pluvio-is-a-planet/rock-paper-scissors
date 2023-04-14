const CHOICES = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;

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
function playRound(computerSelection = '', playerSelection = '') {

	// array to contain the result of each scenario
	const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.']
	let result = '';

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

	// Build a string displaying the result of the game
	// Return the result to use in game() function
	return {
		stringResult: `${result} The computer chose ${computerSelection} and you chose ${playerSelection}.`,
		result: GAME_RESULTS.indexOf(result) // Index used to determine win condition from an array
	};

}

const selectBtns = document.querySelectorAll('#btn');

selectBtns.forEach((selectBtn) => {
	selectBtn.addEventListener('click', (e) => {

  });
});

function determineGameWinner(playerScore, computerScore) {
  if (playerScore === 5) {
    return 'Player wins! Game over.';
  } else if (computerScore === 5) {
    return 'Computer Wins! Game over.';
  }
}