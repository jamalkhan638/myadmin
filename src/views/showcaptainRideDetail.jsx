import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
// import Pagination from "react-js-pagination";
import Pagination from "reactjs-hooks-pagination";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { dataPie } from "variables/Variables";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from 'react-loader-spinner'
import Divider from '@material-ui/core/Divider';
import { Card } from "components/Card/Card.jsx";

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(30, 20, 20),
  },
}));
const GreenTooltip = withStyles({
  tooltip: {
    fontSize: "1em",
    color: "white",
    backgroundColor: "blue",
  },
})(Tooltip);

export default function ShowCaptainRideDetail (props) {
  const classes = useStyles();
 
  const [data, setData] = useState({});
  const [loading, setLoading] = useState()  
  const [error, setError] = useState('') 
  const [  pageRangeDisplayed, setPageRangeDisplayed] =useState()
  const [totalRecords, setTotalRecords] = useState();
  const [currentPage,setCurrentPage] = useState(5);
 


  const pageLimit = 10;
 
  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  const value = props.match.params.id
  const str = value.replace(":","")
  console.log(str)
 
  // .get(`http://localhost:8080/api/ride?populate=true/${str}&limit=${pageLimit}&page=${currentPage}
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/api/ride/${str}?populate=true`, {
  //       headers,
  //     })
  //     .then((res) => {

  //       console.log(res);
  //       console.log(res.data)

  //       setData(res.data)

      
 
        
  //     });
 
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ride?populate=true${str}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data)
        setTotalRecords(res.data.count)
       console.log(currentPage)
        
      });
  }, []);


  console.log(loading)

  console.log(data)


  return (
    <div> 
    { data  ? 
    <div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className="col-sm-4">
            <div>
              <label>Search</label>
              <input
                type="text"
                // value={searchInput}
                // onChange={(e) => handleChange(e.target.value)}
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
              <th scope="col">Time</th>
              <th scope="col">Date</th>
              <th scope="col">Customer Mob</th>
              <th scope="col">Driver Mob</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data>0 &&
              data.map((customer) => {
                return (
                  <tr Key={customer._id}>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(customer.createdAt).toLocaleTimeString()}</td>
                   { (customer.customer)?<td>{customer.customer.mobile}</td>:<td>N/A</td>}
                    {(customer.driver)? <td>{customer.driver.mobile}</td>:<td>N/A</td>}     
                    <td>{customer.category.name}</td>
                    <td>{(customer.status === "accepted")? <td style={{color: "green"}}>{customer.status}</td>: <td style={{color:"blue"}}>{customer.status}</td>}</td>
                    <td>
                      {" "}
                      {/* <GreenTooltip title="Detail" arrow>
                        <IconButton>
                          <DescriptionTwoToneIcon
                            color="primary"
                            onClick={()=>
                              history.push(`/admin/showcaptainRideDetail:${customer._id}`)
                            }
                          />
                        </IconButton>
                      </GreenTooltip> */}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </card>
      <div className="d-flex flex-row py-4 justify-content-end"  style={{ marginLeft: "20px" }}>
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
            </div>
 
      {/* <Modal
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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal> */}
        <div>
     {/* {
 modelOpen()
     } */}
    
 
     
    </div>
    </div>
    :    <div style={{marginLeft : 450, marginTop: 80, marginBottom: 50}}>  <Loader
    type="Puff"
color="grey"
height={100}
align = "centre"
width={100}
margin ="500px"
timeout={3000}
visible={true} //3 secs

/>

</div> }
    </div>
  );
}


  