import { useState, useEffect, useRef } from "react";
import styles from './SideResponseGame.module.css';
import { GrCube } from "react-icons/gr";


interface ISideResponseGameProps {
  round: number;
  onGameEnd: () => void;
}

const getRandomPosition = () => Math.random() < 0.5 ? 'left' : 'right';

const SideResponseGame = ({ round, onGameEnd }: ISideResponseGameProps) => {
  const responseTime = 1000;

  const [showElement, setShowElement] = useState<boolean>(false);
  const [position, setPosition] = useState<'right' | 'left'>(getRandomPosition());
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    const handleFocus = () => {
      if (divElement) {
        divElement.focus();
      }
    };

    handleFocus();

    // Add event listeners to refocus when the div loses focus
    divElement?.addEventListener('focusout', handleFocus);

    // Cleanup event listeners on unmount
    return () => {
      divElement?.removeEventListener('focusout', handleFocus);
    };
  }, []);

  useEffect(() => {
    let gameTimeout: number | undefined;

    if (round >= 0) {
      const waitTime = Math.floor(Math.random() * 4 + 2) * 1000; // 2-5 seconds

      const startGameCycle = () => {
        console.log(`Round ${round}: Waiting for ${waitTime / 1000} seconds`);

        gameTimeout = setTimeout(() => {
          setPosition(getRandomPosition());
          setShowElement(true);
          console.log(`Round ${round}: Displaying element for ${responseTime / 1000} seconds`);

          // Simulate 1 second response time
          gameTimeout = setTimeout(() => {
            setShowElement(false);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key)
  }

  return <div className={styles.gameWrapper}
    onKeyDown={handleKeyDown}
    tabIndex={0}
    ref={divRef}>
    {!showElement && <div>Waiting zone...</div>}
    {showElement && <div className={styles.element} style={{ justifyContent: position === 'right' ? 'flex-start' : 'flex-end' }}><GrCube size="40px" /></div>}
  </div>;
};

export default SideResponseGame;