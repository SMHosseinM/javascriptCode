const guessesEle = document.querySelector('#puzzle');
const leftGuesses = document.querySelector('#guesses');

let game1 = '';

window.addEventListener('keypress', (e) => {
	const guess = String.fromCharCode(e.charCode);
	game1.makeGuess(guess);
	game1.calculateStatus();
	render();
});

const render = () => {
	guessesEle.innerHTML = '';
	leftGuesses.textContent = game1.statusMessage;
	const wordArr = game1.puzzle.split('');
	wordArr.forEach((letter) => {
		const spanEl = document.createElement('span');
		spanEl.textContent = letter;
		guessesEle.appendChild(spanEl);
	});
};

const startGame = async () => {
	const puzzle = await getPuzzle('2');
	game1 = new Hangman(puzzle, 5);
	render();
};

// Referencing start game so this function
document.querySelector('#reset').addEventListener('click', startGame);

startGame();
// getPuzzle(2)
// 	.then((puzzle) => {
// 		console.log(puzzle);
// 	})
// 	.catch((err) => {
// 		console.log(`Error: ${err}`);
// 	});

// getCurrentCountry()
// 	.then((country) => {
// 		console.log(country.name);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// getLocation()
// 	.then((location) => {
// 		return getCountry(location.country);
// 	})
// 	.then((country) => {
// 		console.log(country.name);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
