import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await axios.post(
        "https://expense-backend-woro.onrender.com/api/register",
        form
      );

      alert("Registration Successful");
      navigate("/login");

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="box">
      <h2>Register</h2>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          placeholder="Name"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
        />

        <button className="btn btn-primary w-100">
          Register
        </button>
      </form>

      <p className="mt-3">
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;