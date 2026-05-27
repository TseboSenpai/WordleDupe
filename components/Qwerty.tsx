import { observer } from 'mobx-react-lite'

// 1. Define the shape of your Store
interface WordleStore {
  exactGuesses: string[];
  inexactGuesses: string[];
  allGuesses: string[];
  pressKey: (key: string) => void;
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
        <div key={i} className="flex justify-center mb-1">
          {i === 2 && (
            <div
              onClick={() => {
                if (typeof (store as any).pressKey === 'function') (store as any).pressKey('Enter')
                else console.warn('pressKey not available on store')
              }}
              className="rounded-m m-px flex h-8 w-12 md:h-10 md:w-16 items-center justify-center uppercase text-black bg-gray-200 cursor-pointer"
            >
              enter
            </div>
          )}
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
                  onClick={() => {
                    if (typeof (store as any).pressKey === 'function') (store as any).pressKey(char)
                    else console.warn('pressKey not available on store')
                  }}
                  className={`rounded-m m-px flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center uppercase text-black ${bgColor}`}
              >
                {char}
              </div>
            )
          })}
            {i === 2 && (
              <div
                onClick={() => {
                  if (typeof (store as any).pressKey === 'function') (store as any).pressKey('Backspace')
                  else console.warn('pressKey not available on store')
                }}
                className="rounded-m m-px flex h-8 w-12 md:h-10 md:w-16 items-center justify-center uppercase text-black bg-gray-200 cursor-pointer"
              >
                ⌫
              </div>
            )}
        </div>
      ))}
    </div>
  )
})