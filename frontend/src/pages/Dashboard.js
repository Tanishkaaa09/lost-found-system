import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    description: "",
    type: "",
    location: "",
    date: "",
    contactInfo: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getItems();
    }
  }, []);

  const getItems = async () => {
    const res = await axios.get(
      "https://expense-backend-woro.onrender.com/api/items",
      {
        headers: { Authorization: token }
      }
    );

    setItems(res.data);
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post(
      "https://expense-backend-woro.onrender.com/api/items",
      form,
      {
        headers: { Authorization: token }
      }
    );

    getItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(
      `https://expense-backend-woro.onrender.com/api/items/${id}`,
      {
        headers: { Authorization: token }
      }
    );

    getItems();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="box">
      <h2>Dashboard</h2>

      <form onSubmit={submitHandler}>
        <input
          className="form-control mb-2"
          name="itemName"
          placeholder="Item Name"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          name="type"
          placeholder="Lost / Found"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          name="location"
          placeholder="Location"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          name="date"
          type="date"
          onChange={changeHandler}
        />

        <input
          className="form-control mb-2"
          name="contactInfo"
          placeholder="Contact Info"
          onChange={changeHandler}
        />

        <button className="btn btn-primary w-100">
          Add Item
        </button>
      </form>

      <hr />

      <h5>All Items</h5>

      {items.map((item) => (
        <div className="item-box" key={item._id}>
          <b>{item.itemName}</b><br />
          {item.description}<br />
          {item.type} | {item.location}<br />
          {item.date}<br />
          {item.contactInfo}

          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => deleteItem(item._id)}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        className="btn btn-dark w-100 mt-3"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;