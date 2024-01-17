// Css
import './App.css'

// Hooks
import { useCallback, useEffect, useState } from 'react';

// data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import End from './components/End';
import Game from './components/Game';

const stages = [
  {id:0, name: "start"},
  {id:1, name: "game"},
  {id:2, name: "end"}
];

function App() {
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [ words, _ ] = useState(wordsList);

  const [ pickedWord, setPickedWord ] = useState("");
  const [ pickedCategory, setPickedCategory ] = useState("");
  const [ letters, setLetters ] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const verifyLetter = (letter: string) => {
    const normalizedLetter : string = letter.toLowerCase();

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);

      setScore((actualScore) => actualScore + 50);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word : string = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    setPickedWord(word.toLowerCase());
    setPickedCategory(category);
    setLetters(word.toLowerCase().split(""))

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const returnMenu = () => {
    setGameStage(stages[0].name);

    setScore(0);
    setGuesses(3);
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters : string[] = [... new Set(letters)];

    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      setScore((actualScore) => actualScore + 100);
      startGame();
    }
  }, [guessedLetters, letters, gameStage, startGame]);

  return (
    <>
      {gameStage === "start" && <StartScreen next={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === "end" && <End score={score} next={returnMenu}/>}
    </>
  )
}

export default App
