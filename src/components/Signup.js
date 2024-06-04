import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../contexts/noteContext";
import AlertContext from "../contexts/alertContext";
const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const context = useContext(NoteContext);
  const { setToken, setLogin } = context;
  const navigate = useNavigate();
  const alertContext=useContext(AlertContext);
 const {updateMsg:alertMsg}=alertContext;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (credentials.password !== credentials.cpassword) {
      alertMsg("Both passwords must be same" , "danger");
      return;
    }

    const response = await fetch("https://inotebook-backend-35w8.onrender.com/api/auth/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (!json.errors) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.token);
      setToken(json.token);
      setLogin(true);
      alertMsg("You have successfully created your account" , "success");
      navigate(`/`);
    } else {
      alertMsg(json.errors[0].msg , "danger");
      return;
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={8} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
