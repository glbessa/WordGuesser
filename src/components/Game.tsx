import "./Game.css"

import { useState, createRef } from 'react';

export default function Game({ verifyLetter, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}: { verifyLetter: (letter: string) => void, pickedCategory: string, letters: string[], guessedLetters: string[], wrongLetters: string[], guesses: number, score:number }) {
    const [actualLetter, setActualLetter] = useState<string>("");
    const letterInputRef = createRef<HTMLInputElement>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        verifyLetter(actualLetter);

        setActualLetter("");
    }    
    
    return (
        <div className="game">
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Advinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativas.</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className="blankSquare">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))}
            </div>
            <div className="letterContainer">
                <p>Tente adivinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength={1} required value={actualLetter} onChange={(e) => { setActualLetter(e.target.value)}} ref={letterInputRef}/>
                    <button type="submit">Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    );
}