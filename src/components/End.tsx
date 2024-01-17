import "./End.css"

export default function End({ score, next }: { score: number, next: () => void}) {
    return (
        <div className="end">
            <h1>Fim de jogo</h1>
            <p>Pontuação final: <span>{score}</span></p>
            <button onClick={next}>Ir para o início!</button>
        </div>
    )
}