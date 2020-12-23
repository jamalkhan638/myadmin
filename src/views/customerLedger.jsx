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
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Pagination from "react-js-pagination";

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



export default function CustomerLedger(props) {
  const classes = useStyles();
    const value = props.match.params.id;
    const str = value.replace(":","");
    console.log(str)
  
  

  const [data, setData] = useState([]);
  const [open ,setOpen] = useState("");
  const [opens ,setOpens] = useState("");
  const [incomming, setIncomming] =useState("");
  const [reimburseReason, setreimburseReason] = useState("");
  const [pageRange, setPageRange] = useState();

  const [searchInput, setSearchInput] = useState("");
  // const [PageLimit, setPageLimit] = useState(5);
  const [searchData, setSearchData] = useState("");
  const [customerVar, setCustomerVar] = useState([]);

  const [currentPage, setCurrentPage] = useState();
  const [activePg, setActivePage] = useState(1);
  const [PageLimit, setPageLimit] = useState(50)
  const [totalItemsCount, setTotalItemsCount] = useState();
  const [companyEarning, setcompanyEarning]=useState()
  const [driverEarning, setDriverEarning] = useState()
  const [driverClosing, setDriverClosing] =useState()
  const [closing,setClosing] =useState()
  const [totalRecords, setTotalRecords] = useState();
  const [reason ,setReason] = useState()
   // const [searchData, setseacrh] = useState("")
 

  let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  useEffect(() => {
    console.log(currentPage)
    axios
      .get(`http://localhost:8080/api/receipt/?customer=${str}`, { headers })
      .then(
        (res) => {
          console.log(res);
          console.log(res.data.data);
         
    //  if(res.data.data){
     
    //   setPageRange(Math.ceil(res.data.receipts.length / PageLimit))
    //   setTotalItemsCount(res.data.receipts.length)
   
    //  }
       
          setData(res.data.data)
         
  
        }

       
      );
  }, [data]);
  
  console.log(pageRange)
  console.log(totalItemsCount)

const totalEarning = companyEarning + driverEarning;
console.log(data)
 
const handleCloseClick = () => {
  setOpens(false);
};
const handleOpen = () => {


       setOpen(true);
     }
  
     const handleClick = (customer) => {
       console.log(customer)
       setReason(customer)
      setOpens(true);
    };

  

const handleClose = () => {
  setOpen(false);
};


const handleSubmit=(e)=>{
  setData(data)
e.preventDefault();
  const user ={
   incomming,
   reimburseReason
    
  }
  console.log(user)
  console.log("jjjjjjjjjjjjj")
  axios
  .patch(`http://localhost:8080/api/customer/reimburse/${str}`, user, { headers })
  .then((res=>{
    
    console.log(res);
     

  }))


}


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
{console.log(customer.reimburseReason)}
        <td> {customer.reimburseReason === undefined ? <td>N/A</td> : <Link
      component="button"
      variant="body2"
      onClick={() => {
        handleClick(customer.reimburseReason)
      }}
    >
     <p >Reason</p>
    </Link>  }</td>
           
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
            <div>
            <Button variant ="contained" color ="primary"
            onClick ={()=>{handleOpen()}}> Reimburse </Button>
            </div>
          </div>
          <div className="col-sm-2">
            <div>
            <Button style ={{ backgroundColor: "grey", color : "white"}} variant ="contained" 
            onClick ={()=>  history.push(`/admin/profile:${str}`)}> Back </Button>
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
      <Pagination
          activePage={currentPage}
          itemsCountPerPage={PageLimit}
          //Total record display on
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRange}
          onChange={setCurrentPage}
        />
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
        
                onChange ={(e)=> setIncomming(e.target.value)}
                 ></input>
                 <br></br>
                  <input style ={{ marginTop: 15}}
      name= "reason" 
      type= "name"
  
        
          onChange={(e) => setreimburseReason(e.target.value)}
       >
         </input>
               
                     
          </Col>
        </Row>
        <Button type="submit" onClick ={handleClose} color = "primary" variant ="contained">
            Submit
          </Button>
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
     <div>
   
      <Dialog 
        open={opens}
        onClose={handleCloseClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{" Reason to Reimburse "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <p style ={{color :"green"}}>{reason}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button  onClick={handleCloseClick}  autoFocus color ="primary" variant= "contained">
             Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}