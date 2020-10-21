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
import {Grid,  Row, Col } from "react-bootstrap";
import Maps from "./Maps";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Card } from "components/Card/Card.jsx";
import { useLocation } from "react-router-dom";
import AirportShuttleTwoToneIcon from "@material-ui/icons/AirportShuttleTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import StarRatings from 'react-star-ratings';
import Avatar from 'react-avatar';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
var Line = require('rc-progress').Line;

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    width: 120,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },

 
}));
export default function CaptainProfile(props) {
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());

  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMob] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [ride, setRide] = useState("");
  const [driverRide,setDriverRide]=useState("")
  const [report, setReport] = useState("");
  const [rating,setRating]=useState()
  const [percentage,setPercentage]=useState()
  const [pic,setPic]=useState("")
  const [id,setId]=useState()
  const [driverEarning,setDriverEarning]=useState("0")
  const [companyEarning,setCompanyEarning]=useState("0")
  const [closing,setClosing]=useState("0")
  const [onlineTime,setOnlineTime]=useState("0")
  const [totalDistance,setTotalDistance]=useState("0")






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
      .get(`http://localhost:8080/api/driver/${str}`, { headers })
      .then((res) => {
        console.log(res)
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setMob(res.data.mobile);
        setCity(res.data.city);
        setRating(res.data.rating)
        console.log(res.data.avatar)
        setPic(res.data.avatar)
        console.log(pic)
        setId(res.data.id)
  console.log(id)
        res.data.isBlocked === true ? setStatus("block") : setStatus("active");
      });
  }, []);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

 
  const showRide =(userid)=>{
    console.log(userid)
    history.push(`/admin/captainRide:${userid}`)
    
  };
  



  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ride/ride-count/${str}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setPercentage(res.data.Percentage)
       
      });
  }, []);

 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/driver//get-stats/${str}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
      //   if(res.data !="")
      // {
        setDriverEarning(res.data.earnings.driverEarnings)
        setCompanyEarning(res.data.earnings.companyEarnings)
        setClosing(res.data.earnings.closing)
        setTotalDistance(res.data.earnings.totalDistance)
        setRide(res.data.rides)
        setReport(res.data.reports)
        setOnlineTime(res.data.onlineMins)
      // }
      // console.log(res.data.receipts.totalDistance)
       
      });
  }, []);

 const handleDate=()=>{

  axios
      .get(`http://localhost:8080/api/driver//get-stats/${str}+ `, {
        headers,
      })
      .then((res) => {
        console.log(res);
   
       
      });

 }







  const history = useHistory();

  return (
    <div>
            

      <Row>
      <Col md={6}>
     
     
          <Card
       

  


            title="Profile"
            content={
              <div>
                <Col md= {4}>
                <span>
                <Avatar    src ={`https://malta-images.s3.amazonaws.com/${pic}`} size="150"  round={true} />
                </span>
                </Col>
          <Row>
                  <Col md={6} style ={{padding :30, margin: 20}}>
                  <StarRatings
          
      rating={rating}
      starDimension="40px"
      starSpacing="15px"
      starRatedColor="red"
      starSpacing = "1"

    />
               </Col>
               </Row>  
    
  
  
 
    
              <div style={{ padding: "60px" }}>
              <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                    
                  Acceptance Rate : {percentage}%
                </b>

                <Line percent={percentage} strokeWidth="2" strokeColor="red" trailColor="orange" />
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
           
            title="Action"
            content={
              <div>
                <IconButton>
                  <BlockIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                  />{" "}
                </IconButton>
                <IconButton>
                  <AirportShuttleTwoToneIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                    onClick={e => { showRide(str)
                    }

                    }
                  />
                </IconButton>
                <IconButton>
                  <AssessmentTwoToneIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                  />
                </IconButton>
              </div>
            }
          >
          
            </Card>
           


          <Card
           
   title = "Statistics"


            content={
              <div>
              <div >
              <FormControlLabel
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Apply Filters"
              />

              <div className={classes.container}>
                <Collapse in={checked}>
                  <Paper elevation={4} className={classes.paper}>
    
                  <form className={classes.container} noValidate >
            
                    <TextField
          id="date"
          label="From"
          type="date"
          value={selectedDate1}
          onChange={(e) => setSelectedDate1(e.target.value)}
         defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="date"
        label="To"
        type="date"
        value ={selectedDate2}
        onChange={(e) => setSelectedDate2(e.target.value)}
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
                   
                 


    </form>

                  </Paper>
          
                  <Button
            type ="submit"
            disabled={false}
            color="primary"
            variant="contained"
            size="small"
            onClick ={()=>{handleDate()}}
          >
            Submit
          </Button>
                
                </Collapse>
                </div>
           
                </div>


              <div 
              >
                {/* <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Status:
                </b>
                <p> {status} </p> */}
                <b style={{ color: "#1273DE", fontSize: 15 }}>Total Rides:</b>
                <p> {ride} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Reports:</b>
                <p> {report} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Total Distance Covered:</b>
                <p>{totalDistance} KM</p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Total Online Time:</b>
                <p>{onlineTime} MINS</p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Driver Earning:</b>
                <p>{driverEarning} PKR</p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Company Earning:</b>
                <p>{companyEarning} PKR</p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Closing Balance:</b>
                <p>{closing} PKR</p>
              </div>
             </div>
            }
          />
        </Col>
        <Col>
          <Button
            disabled={false}
            variant="contained"
            size="large"
            style={{ marginTop: "20px", backgroundColor: "gray" }}
            onClick={() => {
              history.push("/admin/captain");
            }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
}
