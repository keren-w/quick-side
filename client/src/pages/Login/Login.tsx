import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate} from 'react-router-dom';
import {login} from "../../api";

const Login = () => {
    const { username: usernameContext, setUsername: setUsernameContext } = useContext(UserContext);
    const [username, setUsername] = useState(usernameContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };

    const handleSubmit = async () => {
        const response = await login(username);
        setUsernameContext(response?.name?.first);
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