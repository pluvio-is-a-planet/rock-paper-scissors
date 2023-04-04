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
function playRound(computerSelection = '', playerSelection = '') {

	// array to contain the result of each scenario
	const GAME_RESULTS = ['You win!', 'You lose...', 'It\'s a tie.']
	let result = '';

	playerSelection = playerSelection.toLowerCase(); // Allows the player to input their answer in any case.

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
	// Return the result to use in game() function
	return {
		stringResult: `${result} The computer chose ${computerSelection} and you chose ${playerSelection}.`,
		result: GAME_RESULTS.indexOf(result) // Index used to determine win condition from an array
	};

}

// function to run the playRound() function 5 times or until one of the players reaches 3 score
function game() {

	let userPoints = 0;
	let computerPoints = 0;

	// loop that executes 5 times
	for (let i = 0; i < 5; i++) {

		// checks win condition
		if (userPoints === 3) {
			
			console.log(`Player wins the game!\n
Final score:
Player: ${userPoints}
Computer: ${computerPoints}`);

			break;
		} else if (computerPoints === 3) {
			
			console.log(`Computer wins the game!\n
Final score:
Player: ${userPoints}
Computer: ${computerPoints}`)
			
			break;
		} else {
			// play round to determine result and increment points
			let roundResult = playRound(getComputerChoice(), prompt('Rock, paper, or scissors?', ''));

			let resultString = roundResult.stringResult; // Retrieve string property from returned object the playRound() function
			let resultIndex = roundResult.result; // Retrieve index of win condition property from returned object the playRound() function

			if (resultIndex === 0) { // If the player wins
				++userPoints;
			} else if (resultIndex === 1) { // If the computer wins
				++computerPoints;
			} else if (resultIndex === 2) { // If the round is a tie
				i--; //Adds 1 extra round so that the game continues until a winner is chosen
			} else {
				i--;
				console.log('Something went wrong, computer or player choice missing.')
			}

			// Display the outcome of every round player and the current tracked score
			console.log(`${resultString} Currrent score is:\n
Player: ${userPoints}
Computer: ${computerPoints}`)
		
		}
		
	}

}

alert(`Let's play rock, paper, scissors!
Here's how it works:\n
- Type "game()" into the console to start the game.
- The game consists of 5 rounds, first to 3 points win.
- If the user or the computer enters an invalid input, that round will not count towards the total amount of rounds played.
- If the result of the round is a tie, that round will not count towards the total amount of rounds played.
- Have fun!`)