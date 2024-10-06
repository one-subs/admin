import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Alert from "./components/Alert.js";

function CreateAccount() {

  const auth = useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const create = async (e) => {
    e.preventDefault();
    try {
      const response = await request("/admin/create", "POST", { username, password }, {
        authorization: `Bearer ${auth.token}`
      });
      if (response) navigate("/admins");
    } catch (err) {}
  }

  const mobile = { margin: "0px", width: "100%", minHeight: "100vh", borderRadius: "0px", boxShadow: "none", paddingTop: "70px" }

  return (
    <div className="back">
      {error ? <Alert message={error} type={"error"} clearError={clearError}/> : ""}
      <div className="form" style={(window.innerWidth > 900) ? {} : mobile}>
        <h1>Create Admin</h1>
        <div className="input-container">
          <input type="text" autoComplete="off" name="username" onChange={(e) => {setUsername(e.target.value)}} required/>
          <label htmlFor="input">Username*</label>
        </div>
        <div className="input-container">
          <input type="text" autoComplete="off" name="password" onChange={(e) => {setPassword(e.target.value)}} required/>
          <label htmlFor="input">Password*</label>
        </div>
        <p style={{ textAlign: "center" }}>If you do not hold Alpha admin status, you cannot create admin.</p>
        <button onClick={(e) => create(e)}>Create</button>
      </div>
    </div>
  );
}

export default CreateAccount;