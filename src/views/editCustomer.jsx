import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditCustomer(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMob] = useState("");
  const [city, setCity] = useState("");

  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };
const value = props.match.params.id
const str = value.replace(":","")
console.log(str)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/${str}`, { headers })
      .then((res) => {
          console.log(res)
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setMob(res.data.mobile);
        setCity(res.data.city);
      });
  }, []);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name:name,
      password,
      email,
      gender,
      mobile,
      city
    };
 console.log(obj)
    axios
      .patch(`http://localhost:8080/api/customer/${str}`, obj, {
        headers,
      })
      .then((res) => {
        if (res.status == 201) {
          history.push("/admin/customer");
        } else {
          alert("Error");
        }
      });
  };

  return (
    <div
      className="container-fluid"
      style={{
        alignContent: "center",
        content: "center",
      }}
    >
      <div className="row" style={{ margin: "10px" }}>
        <div
          className="col-sm-12 "
          style={{
            textAlign: "center",
            backgroundColor: "gray",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <h3>Edit Customer</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-10">
            <h4>Customer Details</h4>
          </div>
          <div className="col-sm-2">
            <Button
              disabled={false}
              variant="contained"
              size="large"
              style={{ marginTop: "20px", backgroundColor: "gray", color: "white"}}
              onClick={() => {
                history.push("/admin/customer");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label>Name </label>
              <input
                type="name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="number"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="number"
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label>City</label>
              <input
                type="name"
                className="form-control"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="number"
              />
            </div>  
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">gender</label>
              <input
                type="gender"
                className="form-control"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                name="number"
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Mob</label>
              <input
                type="number"
                className="form-control"
                required
                value={mobile}
                onChange={(e) => setMob(e.target.value)}
                name="number"
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}>
          <Button
           type ="submit"
            disabled={false}
            color="primary"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

// {id}
//
