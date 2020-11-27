import React, { useState, useEffect } from "react";
import {  Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import ReactTooltip from 'react-tooltip';
import Paper from '@material-ui/core/Paper';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Pagination from "reactjs-hooks-pagination";



import { Card } from "components/Card/Card.jsx";

import Grid from '@material-ui/core/Grid'
import { string } from "prop-types";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCommentRange } from "typescript";
let query = "false";
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

const pageLimit = 50;

export default function Ledger(props) {
  const classes = useStyles();
    const value = props.match.params.id;
    const str = value.replace(":","");
    console.log(str)
  
  

  const [data, setData] = useState([]);
  const [open ,setOpen] = useState("");
  const [amount ,setAmount] =useState("");
  const [reason, setReason] = useState("");
  const [companyEarning, setcompanyEarning]=useState()
  const [incomingByCash,setIncomingByCash]=useState()
  const [totalIncoming, setTotalIncoming] =useState()
  const [driverEarning, setDriverEarning] = useState()
  const [driverClosing, setDriverClosing] =useState()
  const [closing,setClosing] =useState()
   // const [searchData, setseacrh] = useState("")
 

  let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  useEffect(() => {
    // console.log(currentPage)
    axios
      .get(`http://localhost:8080/api/driver/earnings/${str}`, { headers })
      .then(
        (res) => {
          console.log(res);
          setData(res.data.receipts)
     setTotalIncoming(res.data.receipts[0].totalIncoming)
     setIncomingByCash(res.data.receipts[0].incomingByCash)
    setDriverClosing(res.data.receipts[0].driverClosing)
          if(res.data.length !== 0){
            setcompanyEarning(res.data.stats.companyEarnings)
            setDriverEarning(res.data.stats.driverEarnings)
            setClosing(res.data.stats.closing)
          }
  
        }

       
      );
  }, []);
  


const totalEarning = companyEarning + driverEarning;
console.log(data)
 
 
const handleOpen = () => {


       setOpen(true);
     }
  

  

const handleClose = () => {
  setOpen(false);
};

console.log(amount)
const handleSubmit=(e)=>{
e.preventDefault();
  const user ={
    amount:amount,
    reason:reason,
    driverClosing,
    totalIncoming,
    incomingByCash
  }
  console.log(user)
  console.log("jjjjjjjjjjjjj")
  axios
  .patch(`http://localhost:8080/api/driver/clear-ledger/${str}`, user, { headers })
  .then((res=>{
    
    console.log(res);

  }))


}
console.log(totalIncoming)
console.log(incomingByCash)

  let history = useHistory();

  const renderCustomer = () => {
      
    { console.log(data)}
    return (
      data &&
data.length >= 0 &&
      data.map((customer) => {

        { console.log(customer)}
        return (
       
          <tr Key={customer._id}>
  

            <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
            <td>{new Date(customer.createdAt).toLocaleTimeString()}</td>

            <td>{customer.charges.base}  {"  - "}PKR</td>
            <td>{customer.incomingByCash }   {"  - "}PKR</td>
            <td>{customer.incomingByWallet}  {" - "}PKR</td>
            <td>{customer.driverEarning.earning}   {"  - "}PKR</td>
            <td>{customer.companyEarning.earning} {"  - "} PKR</td>
            <td>{customer.driverClosing}  {"   - "}  PKR</td>
            <td>{customer.customerClosing}  {"  - "}PKR</td>

        <td>{customer.isBlocked === true ? <td>Block</td>: <td>Active</td>}</td>
           
          </tr>

        );
 
             
      })
    );
  };

  console.log(data);

  return (
    <div>
      <div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className="col-sm-2">
    <Paper>
           <b style={{ color: "#1273DE", fontSize: 15 }}>Total Earning:</b>
  <p  style={{marginLeft: 40}}> {totalEarning} PKR</p>
  </Paper>
                </div>
             
                <div className="col-sm-2">
                <Paper>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Driver Earning:</b>
                <p style={{marginLeft: 40}}> {driverEarning} PKR </p>
                </Paper>
                </div>
              
                <div className="col-sm-2">
     <Paper>
             <b style={{ color: "#1273DE", fontSize: 15 }}>Company earning:</b>
          <p style={{marginLeft: 40}} > {companyEarning} PKR</p>
          </Paper>
          </div>
      
          <div className="col-sm-2">
          <Paper>
          <b style={{ color: "#1273DE", fontSize: 15 }}>Closing Balance:</b>
          <p  style={{marginLeft: 40}}> {closing} PKR</p>
          </Paper>
          </div>
          
     
          <div className="col-sm-2">
            <div>
            <Button variant ="contained" color ="primary"
            onClick ={()=>{handleOpen()}}> Clear Ledger </Button>
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
           
            <tr style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}>
            <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Date</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col"> Time</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">total Charges</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Incoming by Cash</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Incoming By wallett</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Driver Earning</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Company Earning</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Driver Closing</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">customer Closing</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Action</th>
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
      <div >

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
                 Clear Ledger
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
         
          <form onSubmit ={(e)=>handleSubmit(e)} >
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
                 Amount:
                </b>
                <p>  </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Reason:</b>
                <p>  </p>
               
              </div>
        </Col>
        <Col md={6} >

      
                <input 
                name= "amount"
                type ="number"
        
                onChange ={(e)=> setAmount(e.target.value)}
                 ></input>
                 <br></br>
                  <input style ={{ marginTop: 15}}
      name= "reason" 
      type= "name"
  
        
          onChange={(e) => setReason(e.target.value)}
       >
         </input>
               
                     
          </Col>
        </Row>
        <button type="submit" >
            Submit
          </button>
        {/* <button style ={{ backgroundColor : "green", marginTop : 40}}
              disabled={false}
              variant="contained"
              size="medium"
              color="primary"
              align="center"
              type  ="submit"
            >
             Clear Ledger
            </button> */}

        </form>
       
          </div>
         
        </Fade>
      </Modal>
     </div>
    </div>
  );
}