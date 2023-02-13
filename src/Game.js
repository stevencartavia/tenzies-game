import React, {useState, useEffect} from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

export default function Game() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rolls, setRolls] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        };
        return newDice;
    }
    
    function rollDice() {
        if(!tenzies) {
            setRolls(rolls + 1);
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRolls(0);
            setMinutes(0);
            setSeconds(0);
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    let timer;

    useEffect(() => {
        if(tenzies){
            clearInterval(timer);
        } else {
            timer = setInterval(() => {
                setSeconds(seconds + 1);
    
                if (seconds === 59) {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [seconds, minutes]);
    
    return (
        <main>
            <h3>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</h3>
            {tenzies && <Confetti className="confetti" />}
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <h3>Rolls: {rolls}</h3>
        </main>
    );
}