import React, { useState, useEffect } from "react";
import {  Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "reactjs-hooks-pagination";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Card } from "components/Card/Card.jsx";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Alert from '@material-ui/lab/Alert';
import ReactTooltip from 'react-tooltip';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { string } from "prop-types";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const useStyles = makeStyles((theme) => ({
  roots: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  },


  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "5px solid #aa2e25",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(20, 15, 15),
  },
}));



export default function Input(props){

  const classes = useStyles();

    const [id, setId]= useState()
    const [open, setOpen]= useState()
    const [data, setData]= useState()
    const [offData , setOffData] =useState()
    const [onData , setOnData] =useState()
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [mobile,setMobile]=useState()
    const [gender,setGender]=useState()
    const [searchInput, setSearchInput]=useState()
    const [oncolor,setOnColor]=useState()
    const [ofcolor,setOfColor]=useState()
    const [alert,setAlert]=useState()
    const [autoClose,setAutoClose]=useState(false)
    let token = localStorage.getItem('x-access-token');

let query=false;
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        "x-access-token": token,
      }
      console.log(props.match.params.id)
      const value = props.match.params.id
      const str = value.replace(":","")
   console.log(str)

      useEffect(() => {
        // console.log(currentPage)
        axios
          .get(`http://localhost:8080/api/driver//check-online?socket=${query}`, { headers })
          .then(
            (res) => {
              console.log(res);
              setData(res.data.checkOnlineDrivers);
              
       console.log(data)
              setOfColor("primary")
            }
          
          );
      }, []);

   const handleQuery=(data)=>{
     axios
    .get(`http://localhost:8080/api/driver//check-online?socket=${data}`, { headers })
    .then(
      (res) => {
        console.log(res);
        setData(res.data.checkOnlineDrivers);
        
     console.log(data)
     if(data=== false){
      setOfColor("primary")
      setOnColor("")
    }
    else if(data===true){
      setOnColor("primary")
      setOfColor("")
    }
        
      }
    
    );
      

   }
  
  


// console.log(str)
//     const handleCancel =()=>{
//         axios.patch(`http://localhost:8080/api/ride/cancelDriver/${str}`,{},{headers})
//         .then(res=>{
//             console.log(res)
//         })
//     }

const handleSearch=(val)=>{
  setSearchInput(val)
  axios.get(`http://localhost:8080/api/driver?search=name&q=` + searchInput, {headers})
  .then((res)=>{
    setData(res.data.data)
    
  })
}

// http://52.77.128.14:8080/api/ride/cancelDriver/5f87f1f7328b72323389d0be
const cancelRide =()=>{
  console.log(str)
  axios.patch(`http://localhost:8080/api/ride/cancelDriver/${str}`,{},{headers})
  .then(res=>{
    console.log(res)
    console.log(res.data)
    if(res.data === "cancelled"){
      notifyCancel();
    }
    
  })
}

    const handleAssign =()=>{
      console.log(str)
      
    
        axios.patch(`http://localhost:8080/api/ride/accept-ride1/${str}`, {driver:id,lat:33.593934, lng:73.065291},{headers})
        .then(res=>{
            console.log(res)
            console.log(res.data)
          if(res.data === "Ride assigned"){
            notifyAssign();
          }
            
        })
     
    }

    const notifyCancel = ()=>{
      toast.info('Driver Cancelled', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    const notifyAssign = ()=>{
      toast.success('Ride Assign Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    const handleOpen = (id) => {
      setId(id)
     
         axios.get(`http://localhost:8080/api/driver/${id}`, {headers})
         .then((res)=>{
           
                      setName(res.data.name);
           setEmail(res.data.email);
           setMobile(res.data.mobile)
           setGender(res.data.gender)
           setOpen(true);

         })
      

    };
    console.log(id)
  
    const handleClose = () => {
      setOpen(false);
    };

    const renderCustomer = () => {
        return (
          data &&
          data.length > 0 &&
          data.map((driver) => {
            return (
              <tr Key={driver._id}>
                <td>{driver.name}</td>
                <td>{driver.mobile}</td>
                <td>{driver.email}</td>
    
           
                <td>{driver.gender}</td>
                <td>{driver.city}</td>
                <td>active</td>
                <td>
                  {" "}
             
               
                  
              
                    <IconButton>
                      <ReactTooltip id = "ride" effect ="solid" backgroundColor ="red"/>
                      <AirportShuttleIcon style={{ fontSize: 45 }}
                      data-for ="ride"
                      data-tip ="Cancel driver and Assign Ride"
                        color="primary"
                        onClick={()=>handleOpen(driver._id)}
                       
                      />
                     
                    </IconButton>
                
                
                </td>
              </tr>
            );
          })
        );
      };


    return(
        <div>
     

<div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className="col-sm-8">
            <Button
              disabled={false}
              variant="contained"
              size="medium"
              onClick={(e) => handleQuery(false)}
              color={ofcolor}
            >
              Offline
            </Button>

            <Button
              variant="contained"
              color={oncolor}
              onClick={(e) => handleQuery(true)}
            >
              Online
            </Button>
          </div>
          <div className="col-sm-4">
            <div>
              <label>Search</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <card grid>
        <table
          className="table table-bordered table-condensed table-responsive table-m8"
          style={{ margin: "20px", width: "95%" }}
        >
          <thead>
            <tr>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Name</th>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Mobile</th>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Email</th>
             
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Gender</th>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">City</th>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Status</th>
              <th scope="col"
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderCustomer()}</tbody>
        </table>
      </card>
      {/* <div className="d-flex flex-row py-4 justify-content-end">
        <Pagination
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          pageRangeDisplayed={1}
          onChangePage={setCurrentPage}
        />
      </div> */}
     
    </div>




    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
    
          <div className={classes.paper}>
          
          <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid item xs={12}>
          <Paper style = {{padding: 10, marginBottom: 30}} > <b
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    marginLeft: 120
                  }}
                >
                  Driver Information
                </b></Paper>
        </Grid>
       
        </Grid>
        </div>

            {/* <Row>
              <Col md={6}>
              <h2 id="transition-modal-title">Driver_Profile</h2>
              </Col>
              <Col md={6}>
                <h2>jamal</h2>
              </Col>
            </Row> */}
         
          
            <Row>
            <Col md={6}>
        
              <div style={{ padding: "5px",width: "350px", height: "100px" }}>
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
               
              </div>
        </Col>
        <Col md={6}>
       
        <b style={{ color: "#1273DE", fontSize: 18 }}>Contact No:</b>
                <p> {mobile} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Gender:</b>
                <p> {gender} </p>
               
                     
          </Col>
        </Row>
        <Row>
          <Col
          md={4}>
   <Button style ={{ backgroundColor : "green", marginTop : 40}}
              disabled={false}
              variant="contained"
              size="medium"
              color="primary"
              align="center"
              onClick= {()=> handleAssign()}
            >
              Assign Ride
            </Button>

          </Col>
          <Col
          md={6}>
   <Button style = {{marginLeft : 80, backgroundColor: "red", marginTop : 40}}
              disabled={false}
              variant="contained"
              size="medium"
              color="primary"
              align="center"
              onClick= {()=> cancelRide()}
            >
              cancel Driver
            </Button>
            
          </Col>
       
        </Row>
       
          </div>
         
        </Fade>
      </Modal>
    </div>






    )

}


