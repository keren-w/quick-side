import { useState, useEffect, useRef } from "react";
import { getRandomPosition, getRandomWaitTime, responseTime } from "./utils";

export const useGameLogic = (round: number, onGameEnd: () => void) => {
  const [showElement, setShowElement] = useState<boolean>(false);
  const [position, setPosition] = useState<'right' | 'left'>(getRandomPosition());
  const [feedback, setFeedback] = useState<{ type: 'success' | 'mistake', message: string }>({ type: 'success', message: '' });
  const gameWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutIds = useRef<number[]>([]);

  useEffect(() => {
    const divElement = gameWrapperRef.current;

    const handleFocus = () => {
      if (divElement) {
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
   runGame();
    return () => {
      clearTimeouts();
    };
  }, [round, onGameEnd]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    resetGameCycle(e.key);
  };

  const resetGameCycle = async (key: string) => {
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
        resetGameCycle('late');
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
  };

  const clearTimeouts = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
  };

  const runGame = () => {
    clearTimeouts();
    if (round >= 1) {
      startGameCycle();
    }
  };

  return {
    showElement,
    position,
    feedback,
    gameWrapperRef,
    handleKeyDown,
  };
};
