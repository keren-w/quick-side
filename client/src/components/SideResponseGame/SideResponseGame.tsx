import { useState, useEffect } from "react";
import style from './SideResponseGame.module.css';

interface ISideResponseGameProps {
    round: number;
    onGameEnd: () => void;
}

const SideResponseGame = ({ round, onGameEnd }: ISideResponseGameProps) => {
    const responseTime = 1000; 

    const [showElement, setShowElement] = useState(false);

    useEffect(() => {
      let gameTimeout: number | undefined;
      
      if (round >= 0) {
        const waitTime = Math.floor(Math.random() * 4 + 2) * 1000; // 2-5 seconds
        
        const startGameCycle = () => {
          console.log(`Round ${round}: Waiting for ${waitTime / 1000} seconds`);
          
          gameTimeout = setTimeout(() => {
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
  
    //onKeyDown={handleKeyDown}
    return <div className={style.gameWrapper}> 
        {!showElement && <div>Waiting zone</div>}
        {showElement && <div>Element</div>}
    </div>;
  };

  export default SideResponseGame;