import styles from './SideResponseGame.module.css';
import { GrCube } from "react-icons/gr";
import { useGameLogic } from "./hooks";

interface ISideResponseGameProps {
  round: number;
  onGameEnd: () => void;
}

const SideResponseGame = ({ round, onGameEnd }: ISideResponseGameProps) => {
  const {
    showElement,
    position,
    feedback,
    gameWrapperRef,
    handleKeyDown,
  } = useGameLogic(round, onGameEnd);

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