import { useState, useCallback } from 'react';
import SideResponseGame from '../../components/SideResponseGame/SideResponseGame';
import styles from './GamePlayer.module.css';

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
        <div className={styles.playerWrapper}>
            <button onClick={toggleGameStatus}>
                {isGameOn ? 'Stop Game' : 'Start Game'}
            </button>
            <div className={styles.gameArea}>  {isGameOn && <SideResponseGame round={round} onGameEnd={handleGameEnd} />}</div>
        </div>
    );
};

export default GamePlayer;
