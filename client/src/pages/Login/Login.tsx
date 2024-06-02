import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate} from 'react-router-dom';

const Login = () => {
    const { username: usernameContext, setUsername: setUsernameContext } = useContext(UserContext);
    const [username, setUsername] = useState(usernameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };

    const handleSubmit = () => {
        setUsernameContext(username);
        navigate('/game');
      };
      
    return (
        <div className="login">
           username:
            <input type="text" value={username} onChange={handleChange}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Login;