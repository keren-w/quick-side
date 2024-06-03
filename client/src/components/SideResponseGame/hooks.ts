import { useState, useEffect, useRef } from "react";
import { getRandomPosition, getRandomWaitTime, responseTime } from "./utils";

type TFeedbackType = 'success' | 'mistake';

export const useGameLogic = (round: number, onRoundEnd: (isHit: boolean) => void) => {
  const [showElement, setShowElement] = useState<boolean>(false);
  const [position, setPosition] = useState<'right' | 'left'>(getRandomPosition());
  const [feedback, setFeedback] = useState<{ type: TFeedbackType, message: string }>({ type: 'success', message: '' });
  const gameWrapperRef = useRef<HTMLDivElement>(null);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  

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
  }, [round, onRoundEnd]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    resetGameCycle(e.key);
  };

  const resetGameCycle = async (key: string) => {
    clearTimeouts();
    const newFeedback = getRoundFeedback(key);
    setFeedback(newFeedback);
    setShowElement(false);
    await new Promise(resolve => setTimeout(resolve, 1000))
    onRoundEnd(newFeedback.type === 'success');
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

  const getRoundFeedback = (key: string) => {
    if (key === 'late') {
      return ({ type: 'mistake' as TFeedbackType, message: 'Too Late' });
    }
    if (!showElement) {
      return ({ type: 'mistake' as TFeedbackType, message: 'Too Soon' });

    }
    if (key === 'a' && position === 'left' || key === 'l' && position === 'right') {
      return ({ type: 'success' as TFeedbackType, message: 'Success' });
    } 
    return ({ type: 'mistake' as TFeedbackType, message: 'Wrong Key' });
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
