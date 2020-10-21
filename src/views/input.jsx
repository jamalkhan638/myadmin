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

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'




const GreenTooltip = withStyles({
  tooltip: {
    fontSize: "1em",
    color: "white",
    backgroundColor: "blue",
  },
})(Tooltip);

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



    const handleAssign =()=>{
        axios.patch(`http://localhost:8080/api/ride/accept-ride/${str}`, {driver:id},{headers})
        .then(res=>{
            console.log(res)
            
            
        })
    }


    const handleOpen = (id) => {
    
     
         axios.get(`http://localhost:8080/api/driver/${id}`, {headers})
         .then((res)=>{
           setName(res.data.name);
           setEmail(res.data.email);
           setMobile(res.data.mobile)
           setGender(res.data.gender)
           setOpen(true);

         })
      

    };
    
  
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
             
                  
                  
              
                  <GreenTooltip title="Assign Ride" arrow>
                    <IconButton>
                      <AirportShuttleIcon style={{ fontSize: 45 }}
                        color="primary"
                        onClick={()=>handleOpen(driver._id)}
                       
                      />
                     
                    </IconButton>
                  </GreenTooltip>
                
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper >Driver</Paper>
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
   <Button
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
       
        </Row>
       
          </div>
         
        </Fade>
      </Modal>
    </div>






    )

}


