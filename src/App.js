import React, {useState, useEffect} from "react";
import Game from "./Game";

export default function App() {
    const [start, setStart] = useState(false);

    const startGame = () => {
        setStart(prevState => !prevState);
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            {!start && 
            <p className="instructions">
                Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </p>}
            {start && <Game />}
            <button 
                className="start-game-button" 
                onClick={startGame}
            >
                {start ? 'Restart' : 'Start Game'}
            </button>
        </main>
    );
}