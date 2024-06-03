import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../contexts/noteContext';
import AlertContext from '../contexts/alertContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const context=useContext(NoteContext);
    const {setToken , setLogin} = context;
    const navigate = useNavigate();
    const alertCon=useContext(AlertContext);
    const {updateMsg : alertMsg} = alertCon;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3020/api/auth/login-user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (!json.error) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            setToken(json.token);
            navigate(`/`);
            alertMsg("Welcome back!!!" , "success");
            setLogin(true);
        } else {
            alertMsg(json.error , "danger");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        required
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                        minLength={8}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
