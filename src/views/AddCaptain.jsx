import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import "../components/loginForn/Login.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "../assets/css/header.css";
import { BorderAllRounded } from "@material-ui/icons";
import Avatar from "react-avatar-edit";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.5),
      width: 200,
    },
  },
}));
export default function AddCaptain(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const maxNumber = 69;
  let history = useHistory();

  const onChangePicture = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
 
  let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };
  const handleCancel = (evt) => {
    history.push("/admin/captain");
  };
console.log(imgData)
  const handleSubmit = (evt) => {
    evt.preventDefault();

 
    const user = {
      name: name,
      password: password,
      gender: gender,
      mobile: mobile,
      email: email,
      city: city,
      avatar: imgData
    };
console.log(user)
    axios
      .post(`http://localhost:8080/api/admin/add-driver`, user, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
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
          <h3>Add Captain</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-10">
            <h4>Vehicle details</h4>
          </div>
          <div className="col-sm-2">
            <button
              type="submit"
              className="btn btn-secondry btn-sm"
              style={{ marginTop: "20px" }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label> Name </label>
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
              <label htmlFor="number">Email</label>
              <input
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="number"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Mobile</label>
              <input
                type="number"
                className="form-control"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="number"
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Gender</label>
              <input
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
              <label htmlFor="number">Password</label>
              <input
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
              <label htmlFor="number">City</label>
              <input
                className="form-control"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="number"
              />
            </div>
          </div>
          <div className="register_profile_image">
                <input id="profilePic" type="file" onChange={(e)=> onChangePicture(e)} />
              </div>
              <div className="previewProfilePic">
               <img className="playerProfilePic_home_tile" src={imgData} />
              </div>
              {/* <button onClick ={(e)=> onChangePicture(e)}>upload</button> */}
          {/* <div className="col-sm-4">

            <div className="form-group">
              <label htmlFor="number">Category *</label>
              <input type="number" className="form-control" required value={charges_waitingOnUnloading} onChange={e => set_charges_waitingOnUnloading(e.target.value)}
                name="number" />
            </div>


          </div>
        </div>

        <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}> */}

          <button type="submit" className="btn btn-primary btn-mg">
            Submit
          </button>
        </div>

        {/* <div className="row" style={{ marginTop: "30px" }}>


          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Name *</label>
              <input type="number" className="form-control" required value={charges_congestion} onChange={e => set_ChargesCongestion(e.target.value)}
                name="number" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Mobile Number *</label>
              <input type="number" className="form-control" required value={loadingMins} onChange={e => set_loadingMins(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Email *</label>
              <input type="number" className="form-control" required value={unloadingMins} onChange={e => set_unloadingMins(e.target.value)}
                name="number" />
            </div>
          </div>
        </div> */}

        {/* <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-3">



            <div className="form-group">
              <label htmlFor="number">Password *</label>
              <input type="number" className="form-control" required value={earning_driver} onChange={e => set_earning_driver(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="number">Gender *</label>
              <input type="number" className="form-control" required value={earning_company} onChange={e => set_earning_company(e.target.value)}
                name="number" />
            </div>
          </div>


          <div className="col-sm-3">



            <div className="form-group">
              <label htmlFor="number">City *</label>
              <input type="number" className="form-control" required value={cancellation_count} onChange={e => set_cancellation_count(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="number">Vehicle *</label>
              <input type="number" className="form-control" required value={cancellation_time} onChange={e => set_cancellation_time(e.target.value)}
                name="number" />
            </div>
          </div>

        </div> */}

        {/* <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}>

          <button type="submit" className="btn btn-primary btn-mg">
            Submit
    </button>
        </div> */}
      </form>
    </div>
  );
}