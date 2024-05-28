import { useState, useCallback } from 'react';
import SideResponseGame from '../../components/SideResponseGame/SideResponseGame';

// GameContainer Component
const GamePlayer = () => {
    const [isGameOn, setIsGameOn] = useState(false);
    const [round, setRound] = useState(1);

    const handleGameEnd = useCallback(() => {
        setRound(prevRound => prevRound + 1);
    }, []);

    const toggleGameStatus = () => {
        if (isGameOn) {
            setIsGameOn(false);
        } else {
            setIsGameOn(true);
        }
    };

    return (
        <div>
            <button onClick={toggleGameStatus}>
                {isGameOn ? 'Stop Game' : 'Start Game'}
            </button>
            {isGameOn && <SideResponseGame round={round} onGameEnd={handleGameEnd} />}
        </div>
    );
};

export default GamePlayer;
