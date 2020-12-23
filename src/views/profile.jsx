import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Maps from "./Maps";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Card } from "components/Card/Card.jsx";
import { useLocation } from "react-router-dom";
import AirportShuttleTwoToneIcon from "@material-ui/icons/AirportShuttleTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import { StraightenTwoTone } from "@material-ui/icons";
import Divider from '@material-ui/core/Divider';
import ReactTooltip from 'react-tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { Facebook } from "react-content-loader";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyFacebookLoader = () => <Facebook />;


export default function Profile(props) {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMob] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [ride, setRide] = useState("0");
  const [report, setReport] = useState("");

  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };
 const value = props.match.params.id;
  const str = value.replace(":","")
 console.log(str)
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/${str}`, { headers })
      .then((res) => {
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setMob(res.data.mobile);
        setCity(res.data.city);
        
        res.data.isBlocked === true ? setStatus("block") : setStatus("active");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ride/?customer=${str}`, { headers })
      .then((res) => {
        console.log(res);
        res.data === "" ? setRide("0") : setRide(res.data.count);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/complaint?customer=${str}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        res.data === "" ? setReport("0") : setReport(res.data.count);
      });
  }, []);



  const handleBlock = () => {
    // const myUrl  = "http://localhost:8080/api/customer/"

    axios
      .patch(
        `http://localhost:8080/api/customer/block/${str}`,
        {},
        { headers }
      )
      .then((res) => {
        console.log(res);
     
       notifyBlocked()
      
      });
  };



  const notifyBlocked = () => {
  
    console.log("notify")
    toast.dark(' Data Updated Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  
    }

  const history = useHistory();

  return (
    <div>
      { name ? 

    <div>
      <Row>
        <Col md={6}>
          <Card
           
            content={

              <div >

<Row>
                  <Col md= {6}>
                <b  style={{
                    color: "grey",
                    fontSize: 25,
                    fontWeight: "400",
                    padding: 8,
                    margin: 10,
                  }}  >Profile</b>
                  </Col>
                  <Col md= {3}  style={{  marginTop: -10, marginLeft: 120}}>
                    <div>
                    <IconButton>
                    <ReactTooltip id ="edit" effect ="solid" backgroundColor= "blue" />
                    <EditIcon color="primary"
                    data-tip ="Edit"
                    data-for="edit"
                    style={{ fontSize: 35, }}
                    onClick={() =>
                      history.push(`/admin/editCustomer:${str}`)
                    }
                     />
                  </IconButton>
                    </div>
                   
                  </Col>
                </Row>
               
                <Divider />

                <div style={{ padding: "60px" }}>
                <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Name:
                </b>
                <p> {name} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Email:</b>
                <p> {email} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Contact No:</b>
                <p> {mobile} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Gender</b>
                <p>{gender} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>City:</b>
                <p> {city} </p>
                </div>
              </div>
            }
          />
          
        </Col>
        <Col md={4}>
          <Card
       
            content={
              <div>
                  <b  style={{
                    color: "grey",
                    fontSize: 25,
                    fontWeight: "450",
                    marginTop: 30
                  }}  >Action</b>
   <Divider />
                <IconButton>

                <ReactTooltip id ="block" effect ="solid" backgroundColor= "black" />
                {status === "block" ? <BlockIcon
                   data-tip="Unblock"
                   data-for="block"
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                    onClick ={()=> handleBlock()}
                  />: 
                  <BlockIcon
                  data-tip="Block"
                  data-for="block"
                   style={{ fontSize: 45, margin: 15 }}
                   color="primary"
                   onClick ={()=> handleBlock()}
                 />
                  }
                  
                </IconButton>
                <IconButton>
                <ReactTooltip id ="ride" effect ="solid" backgroundColor= "green" />
                  <AirportShuttleTwoToneIcon
                  data-tip="Rides"
                  data-for="ride"
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                    onClick={() =>
                      history.push(`/admin/customerRide:${str}`)
                    }
                  />
                </IconButton>
                <IconButton>
                <ReactTooltip id ="report" effect ="solid" backgroundColor= "red" />
                  <AssessmentTwoToneIcon
                   data-tip="Reports"
                   data-for="report"
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                    onClick={() =>
                      history.push(`/admin/customerReport:${str}`)
                    }
                  />
                </IconButton>
              </div>
            }
          />
          <Card

            content={

              <div >
                <b  style={{
                    color: "grey",
                    fontSize: 25,
                    fontWeight: "450",
                    marginTop: 30
                  }}  >Statistics</b>
   <Divider />

                <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
               
                  }}
                >
                  Status:
                </b>
                <p> {status} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Total Rides:</b>
                <p> {ride} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Reports:</b>
                <p> {report} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Credit:</b>
                <p>{} </p>
              </div>
            }
          />
           <Button variant = "contained" size = "large" color ="primary" 
     onClick={() =>
      history.push(`/admin/customerLedger:${str}`)
    }
             >Get Ledger</Button>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </div>
 : <MyFacebookLoader />}
</div>
  );
}
