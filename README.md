# Wordle Dupe

A small Wordle-like puzzle built with Next.js and TypeScript. Players guess a hidden five-letter word using an on-screen keyboard and a guess grid. The project is intentionally compact and readable — ideal as a learning example for React state management and component composition.

## Features

- Simple Wordle-style gameplay (5-letter words, colored feedback)
- On-screen keyboard and guess grid components
- Game state managed in a central store
- Local word list in `words.json` for easy customization

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- CSS modules / global styles

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure (important files)

- `words.json` — local word list used by the game
- `stores/PuzzleStore.tsx` — game state and logic
- `components/Guess.tsx` — guess row UI
- `components/Qwerty.tsx` — on-screen keyboard UI

## Development Notes

- To change the word list, edit `words.json` and restart the dev server.
- Game logic lives in the store; adjust validation or feedback there.
- Styling is in `styles/` and `app/globals.css` — tweak for different themes.

## Contributing

Contributions are welcome. Open an issue or create a pull request with improvements or bug fixes.

## License

No license specified. Add one if you plan to publish or share this project publicly.
