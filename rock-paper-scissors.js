// function to get the randomly chosen computer choice
// choice is selected in an array of options,
// using the index of the array and the Math.random and Math.floor functions
function getComputerChoice() {
	const CHOICES = ['rock', 'paper', 'scissors'];
	let computerChoice = CHOICES[Math.floor(Math.random() * 3)];

	return computerChoice;
}