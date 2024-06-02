
import { useContext } from 'react';
import { UserContext } from '../../context';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    const { userData } = useContext(UserContext);
    const { name, picture } = userData;
    return (
        <div className={styles.sideBar}>
            {picture && <img src={picture} alt="profile"/>}
            {name?.first && <h3>Hello {name.first}</h3>}
            <h3>Play games</h3>
            <nav>
                <ul>
                    <li><Link to="/game">Side Response</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;