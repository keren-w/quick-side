import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
import { useNavigate} from 'react-router-dom';
import {login} from "../../api";

const Login = () => {
    const {setUserData} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    };

    const handleSubmit = async () => {
        const response = await login(username);
        setUserData(response);
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