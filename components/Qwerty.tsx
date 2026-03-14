import { observer } from 'mobx-react-lite'

// 1. Define the shape of your Store
interface WordleStore {
  exactGuesses: string[];
  inexactGuesses: string[];
  allGuesses: string[];
}

// 2. Define the props for this component
interface QuertyProps {
  store: WordleStore;
}

// 3. Tell the function to use those props
export default observer(function Querty({ store }: QuertyProps) {
  const qwerty = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  return (
    <div>
      {qwerty.map((row, i) => (
        <div key={i} className="flex justify-center">
          {row.split('').map((char) => {
            const bgColor = store.exactGuesses.includes(char)
              ? 'bg-green-400'
              : store.inexactGuesses.includes(char)
              ? 'bg-yellow-400'
              : store.allGuesses.includes(char)
              ? 'bg-gray-400'
              : 'bg-gray-200'
            return (
              <div
                key={char}
                className={`rounded-m m-px flex h-10 w-10 items-center justify-center uppercase text-black ${bgColor}`}
              >
                {char}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
})