import words from "../words.json"

export default {
    word: '',
    guesses: [] as string[],
    currentGuess: 0,
    get won() {
        return this.guesses[this.currentGuess - 1] === this.word
    },
    get lost() {
        return this.currentGuess === 6
    },
    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join("").split("")
    },
    get exactGuesses() {
        //if any guesses include this letter in this position/index
        return this.word.split('')
        .filter((letter, i) => {
            return this.guesses.slice(0, this.currentGuess).map((word) => word[i]).includes(letter)
        })
    },
    get inexactGuesses() {
        return this.word.split("").filter((letter) => this.allGuesses.includes(letter))
    },
    init() {
        //Use Math.floor to avoid hitting an index that doesn't exist
        this.word = words[Math.floor(Math.random() * words.length)]
        this.guesses = new Array(6).fill('')
        this.currentGuess = 0
    }, 
    Submitguess() {
        // Added a check to ensure the current guess exists before calling .includes
        if (this.guesses[this.currentGuess] && words.includes(this.guesses[this.currentGuess])) {
            this.currentGuess += 1
        }
    },
    // FIX: Added the KeyboardEvent type to the 'e' parameter
    handleKeyup(e: KeyboardEvent) {
        if (this.won || this.lost) {
            return
        }

        if (e.key === 'Enter') {
            return this.Submitguess()
        }
        if (e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            )
            return
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] =
                this.guesses[this.currentGuess] + e.key.toLowerCase()
        }
    }
}