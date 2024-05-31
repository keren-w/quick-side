import { useState, useEffect, useRef } from "react";
import styles from './SideResponseGame.module.css';
import { GrCube } from "react-icons/gr";

interface ISideResponseGameProps {
  round: number;
  onGameEnd: () => void;
}

const getRandomPosition = () => Math.random() < 0.5 ? 'left' : 'right';
const getRandomWaitTime = (rangeStart: number, rangeEnd: number) => Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart) * 1000;
const responseTime = 1000;

const SideResponseGame = ({ round, onGameEnd }: ISideResponseGameProps) => {
  const [showElement, setShowElement] = useState<boolean>(false);
  const [position, setPosition] = useState<'right' | 'left'>(getRandomPosition());
  const [feedback, setFeedback] = useState<{ type: 'success' | 'mistake', message: string }>({ type: 'success', message: '' });
  const gameWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutIds = useRef<number[]>([]);

  /*************** useEffects ***************/
  useEffect(() => {
    const divElement = gameWrapperRef.current;

    const handleFocus = () => {
      if (divElement && document.activeElement !== divElement) {
        divElement.focus();
      }
    };
    handleFocus();
    divElement?.addEventListener('focusout', handleFocus);
    return () => {
      divElement?.removeEventListener('focusout', handleFocus);
    };
  }, []);

  useEffect(() => {
    if (round >= 1) {
      startGameCycle();
    }
    return () => {
      clearTimeouts();
    };
  }, [round, onGameEnd]);

  /*************** functions ***************/
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    endGameCycle(e.key);
  }

  const endGameCycle = async (key: string) => {
    clearTimeouts();
    setGameFeedback(key);
    setShowElement(false);
    await new Promise(resolve => setTimeout(resolve, 1000))
    onGameEnd();
    startGameCycle();
  };

  const startGameCycle = () => {
    const waitTime = getRandomWaitTime(2, 5);

    setFeedback({ type: 'success', message: '' });
    console.log(`Round ${round}: Waiting for ${waitTime / 1000} seconds`);

    const waitTimeout = setTimeout(() => {
      setPosition(getRandomPosition());
      setShowElement(true);
      console.log(`Round ${round}: Displaying element for ${responseTime / 1000} seconds`);

      const responseTimeout = setTimeout(() => {
        setShowElement(false);
        endGameCycle('late');
      }, responseTime);

      timeoutIds.current.push(responseTimeout);
    }, waitTime);

    timeoutIds.current.push(waitTimeout);
  };

  const setGameFeedback = (key: string) => {
    if (key === 'late') {
      setFeedback({ type: 'mistake', message: 'Too Late' });
      return;
    }
    if (!showElement) {
      setFeedback({ type: 'mistake', message: 'Too Soon' });
      return;
    }
    if (key === 'a' && position === 'left' || key === 'l' && position === 'right') {
      setFeedback({ type: 'success', message: 'Success' });
      return;
    }
    setFeedback({ type: 'mistake', message: 'Wrong Key' });
  }

  const clearTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  }

  return <div className={styles.gameWrapper}
    onKeyDown={handleKeyDown}
    tabIndex={0}
    ref={gameWrapperRef}>
    <div>Round {round}</div>
    {!showElement && !feedback.message && <div>Waiting zone...</div>}
    {showElement && <div className={styles.element}
      style={{ justifyContent: position === 'left' ? 'flex-start' : 'flex-end' }}
    >
      <GrCube size="40px" />
    </div>}
    <div className={styles.feedback} style={{ color: feedback.type === 'success' ? 'green' : 'red' }}>
      {feedback.message}
    </div>
  </div>;
};

export default SideResponseGame;