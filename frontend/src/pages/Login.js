import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="box">
      <h2>Login</h2>

      <form onSubmit={submitHandler}>
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={changeHandler} />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={changeHandler} />

        <button className="btn btn-success w-100">Login</button>
      </form>

      <p className="mt-3">
        New User? <Link to="/">Register</Link>
      </p>
    </div>
  );
}

export default Login;