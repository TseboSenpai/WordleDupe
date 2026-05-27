import { makeAutoObservable } from 'mobx'
import words from "../words.json"

class PuzzleStoreClass {
    word = ''
    guesses = [] as string[]
    currentGuess = 0
    error = ''

    constructor() {
        makeAutoObservable(this)
        // bind methods so they become own properties (accessible through MobX proxies)
        this.pressKey = this.pressKey.bind(this)
        this.handleKeyup = this.handleKeyup.bind(this)
        this.init = this.init.bind(this)
        this.Submitguess = this.Submitguess.bind(this)
        this.setError = this.setError.bind(this)
    }

    get won() {
        return this.guesses[this.currentGuess - 1] === this.word
    }

    get lost() {
        return this.currentGuess === 6
    }

    get allGuesses() {
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    }

    get exactGuesses() {
        return this.word
            .split('')
            .filter((letter, i) => this.guesses.slice(0, this.currentGuess).map((word) => word[i]).includes(letter))
    }

    get inexactGuesses() {
        return this.word.split('').filter((letter) => this.allGuesses.includes(letter))
    }

    init() {
        this.word = words[Math.floor(Math.random() * words.length)]
        this.guesses = new Array(6).fill('')
        this.currentGuess = 0
    }

    Submitguess() {
        const guess = this.guesses[this.currentGuess]
        // debug
        // eslint-disable-next-line no-console
        console.log('Submitguess:', { guess, includes: guess ? words.includes(guess) : undefined })
        if (!guess || guess.length < 5) {
            this.setError('Not enough letters')
            return
        }
        if (words.includes(guess)) {
            this.currentGuess += 1
        } else {
            this.setError('Not in word list')
        }
    }

    setError(msg: string) {
        // eslint-disable-next-line no-console
        console.warn('setError:', msg)
        this.error = msg
        setTimeout(() => {
            if (this.error === msg) this.error = ''
        }, 1500)
    }

    pressKey(key: string) {
        if (this.won || this.lost) return
        const k = key.toLowerCase()
        if (k === 'enter') return this.Submitguess()
        if (k === 'backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, this.guesses[this.currentGuess].length - 1)
            return
        }
        if (this.guesses[this.currentGuess].length < 5 && k.match(/^[a-z]$/)) {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess] + k
        }
    }

    handleKeyup(e: KeyboardEvent) {
        if (this.won || this.lost) return
        if (e.key === 'Enter') return this.Submitguess()
        if (e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(0, this.guesses[this.currentGuess].length - 1)
            return
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess] + e.key.toLowerCase()
        }
    }
}

export default function PuzzleStore() {
    return new PuzzleStoreClass()
}