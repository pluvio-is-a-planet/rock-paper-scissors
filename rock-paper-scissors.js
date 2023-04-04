const CHOICES = ['rock', 'paper', 'scissors'];

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
function playRockPaperScissors(computerSelection, playerSelection) {

	// array to contain the result of each scenario
	const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.']
	let result = '';

	playerSelection = playerSelection.toLowerCase();

	// testing if/switch case block
	if (computerSelection === 'rock') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[2];
				break;
			case 'paper':
				result = GAME_RESULTS[0];
				break;
			case 'scissors':
				result = GAME_RESULTS[1];
				break;
			default:
				return 'You did not choose, or you entered an invalid input.';
		}
	} else if (computerSelection === 'paper') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[1];
				break;
			case 'paper':
				result = GAME_RESULTS[2];
				break;
			case 'scissors':
				result = GAME_RESULTS[0];
				break;
			default:
				return 'You did not choose, or you entered an invalid input.';
		}
	} else if (computerSelection === 'scissors') {
		switch (playerSelection) {
			case 'rock':
				result = GAME_RESULTS[0];
				break;
			case 'paper':
				result = GAME_RESULTS[1];
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
	return (`${result} The computer chose ${computerSelection} and you chose ${playerSelection}.`);

}