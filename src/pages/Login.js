import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function Login() {

  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/admin/login", "POST", { username, password });
      if (response) {
        auth.login(response.token, response.userId);
        navigate("/");
      }
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? {} : mobile}>
        <h1>Log in</h1>
        <div className="input-container">
          <input type="text" autoComplete="off" name="username" onChange={(e) => setUsername(e.target.value)} required/>
          <label htmlFor="input">Username</label>
        </div>
        <div className="input-container">
          <input type="password" autoComplete="off" name="password" onChange={(e) => setPassword(e.target.value)} required/>
          <label htmlFor="input">Password</label>
        </div>
        <p style={{ textAlign: "center" }}>If you don't have an admin account, request from Alpha admin alpha@onesubs.co.</p>
        <button onClick={(e) => login(e)}>Sign in</button>
      </div>
    </div>
  );
}

export default Login;