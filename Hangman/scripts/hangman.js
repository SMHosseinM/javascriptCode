class Hangman {
	constructor(word, remainingGuesses) {
		this.word = word.toLowerCase().split('');
		this.remainingGuesses = remainingGuesses;
		this.guessedLetters = [];
		this.status = 'Playing';
	}

	get puzzle() {
		let puzzle = '';

		this.word.forEach((letter) => {
			if (this.guessedLetters.includes(letter) || letter === ' ') {
				puzzle += letter;
			} else {
				puzzle += '*';
			}
		});
		return puzzle;
	}

	makeGuess(guess) {
		guess = guess.toLowerCase();
		const isUnique = !this.guessedLetters.includes(guess);
		const badGuess = !this.word.includes(guess);
		if (this.status.toLowerCase() !== 'playing') {
			return;
		}
		if (isUnique) {
			this.guessedLetters.push(guess);
		}

		if (isUnique && badGuess) {
			this.remainingGuesses--;
		}
		this.calculateStatus();
	}

	calculateStatus() {
		if (!this.puzzle.includes('*')) {
			this.status = 'Finished';
		} else if (this.remainingGuesses === 0) {
			this.status = 'Failed';
		}
	}

	get statusMessage() {
		const finalStatus = this.status.toLowerCase();
		if (finalStatus === 'playing') {
			return `Guesses left: ${this.remainingGuesses}`;
		} else if (finalStatus === 'failed') {
			return `Nice try! The word was "${this.word.join('')}"`;
		} else {
			return 'Great work! You guessed the word';
		}
	}
}
