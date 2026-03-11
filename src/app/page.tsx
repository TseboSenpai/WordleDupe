'use client';

import { observer, useLocalObservable } from "mobx-react-lite";
import Guess from "../../components/Guess";
import Qwerty from "../../components/Qwerty";
import PuzzleStore from "../../stores/PuzzleStore";
import { useEffect } from "react";

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return () => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [])

  return <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#111827]">
    <h1 className = "text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-500">Wordle</h1>
    {store.guesses.map((_, i) => (
        <Guess
          key = {i}
          word={store.word}
          guess={store.guesses[i]}
          isGuessed={i < store.currentGuess}
        />
    ))}
    {store.won && <h1>You Won!</h1>}
    {store.lost && <h1>You Lost!</h1>}
    {(store.won || store.lost) && (
      <button onClick={store.init}>Play Again</button>
    )}
    <Qwerty store={store} />
    {/* word: {store.word}
    guesses: {JSON.stringify(store.guesses)}
    */}
  </div>
})