import './StartScreen.css'

export default function StartScreen({ next } : { next: () => void}) {
    return (
        <div className="start">
            <h1>Guess The Words</h1>
            <p>Clique no botão abaixo para começar a jogar</p>
            <button onClick={next}>Começar</button>
        </div>
    )
}