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

  useEffect(() => {
    const divElement = gameWrapperRef.current;

    const handleFocus = () => {
      if (divElement) {
        divElement.focus();
      }
    };

    handleFocus();

    // Add event listeners to refocus when the div loses focus
    divElement?.addEventListener('focusout', handleFocus);

    // Cleanup event listeners
    return () => {
      divElement?.removeEventListener('focusout', handleFocus);
    };
  }, []);

  useEffect(() => {
    let gameTimeout: number | undefined;

    if (round >= 0) {
      const waitTime = getRandomWaitTime(2,5); // 2-5 seconds wait time

      const startGameCycle = () => {
        setFeedback({type: 'success', message: ''});
        console.log(`Round ${round}: Waiting for ${waitTime / 1000} seconds`);
        gameTimeout = setTimeout(() => {
          setPosition(getRandomPosition());
          setShowElement(true);
          console.log(`Round ${round}: Displaying element for ${responseTime / 1000} seconds`);

          // Simulate 1 second response time
          gameTimeout = setTimeout(async () => {
            setShowElement(false);
            if (!feedback.message) {
              setFeedback({ type: 'mistake', message: 'Too Late' });
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            onGameEnd();
          }, responseTime);
        }, waitTime);
      };

      startGameCycle();
    }

    // Cleanup function
    return () => {
      if (gameTimeout) clearTimeout(gameTimeout);
    };
  }, [round, onGameEnd]);

  // functions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!showElement) {
      setFeedback({ type: 'mistake', message: 'Too Soon' });
    } else if (e.key === 'a' && position === 'left' || e.key === 'l' && position === 'right') {
      setFeedback({ type: 'success', message: 'Success' });
    } else {
      setFeedback({ type: 'mistake', message: 'Wrong Key' });
    }
  }

  return <div className={styles.gameWrapper}
    onKeyDown={handleKeyDown}
    tabIndex={0}
    ref={gameWrapperRef}>
    {!showElement && <div>Waiting zone...</div>}
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

export default SideResponseGame