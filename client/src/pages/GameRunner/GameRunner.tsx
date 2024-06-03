import { useState, useContext, useCallback } from 'react';
import { UserContext } from '../../context';
import SideResponseGame from '../../components/SideResponseGame/SideResponseGame';
import styles from './GameRunner.module.css';
import {updateUserScore, getLeaderboard} from '../../api';

const GameRunner = () => {
    const [isGameOn, setIsGameOn] = useState(false);
    const [round, setRound] = useState(1);
    const [hits, setHits] = useState(0);
    const { userData, setUserData } = useContext(UserContext);

    const handleRoundEnd = useCallback((isHit: boolean) => {
        setRound(prevRound => prevRound + 1);
        setHits(hits => isHit ? hits + 1 : hits);
    }, []);

    const toggleGameStatus = async () => {
        if (isGameOn) {
            setIsGameOn(false);
            const updatedUserData = await updateUserScore(userData.id, {rounds: round-1, hits});
            setUserData(updatedUserData);
            getLeaderboard();
        } else {
            setIsGameOn(true);
        }
    };

    return (
        <div className={styles.playerWrapper}>
            <button onClick={toggleGameStatus}>
                {isGameOn ? 'Stop Game' : 'Start Game'}
            </button>
            <div className={styles.gameArea}>  {isGameOn && <SideResponseGame round={round} onRoundEnd={handleRoundEnd} />}</div>
        </div>
    );
};

export default GameRunner;
