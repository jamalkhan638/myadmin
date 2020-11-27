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
import ReactDOM from 'react-dom';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from 'react-loader-spinner'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Data } from "@react-google-maps/api";
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

export default function CaptainRide(props) {
  const classes = useStyles();
 
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true)  
  const [error, setError] = useState('') 
  const [  pageRangeDisplayed, setPageRangeDisplayed] =useState()
  const [totalRecords, setTotalRecords] = useState();
  const [currentPage,setCurrentPage] = useState(5);
  const [cusMob,setCusNob]=useState()
  const [rideData,setRideData]=useState();


  const pageLimit = 50;
 
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
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ride?populate=true&driver=${str}&limit=${pageLimit}&page=${currentPage}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data)
        setTotalRecords(res.data.count)
       console.log(currentPage)
        
      });
  }, [currentPage]);


  // axios.get('http://5e709ac5667af70016317119.mockapi.io/users?page='+currentPage+'&limit='+pageLimit)  


  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8080/api/ride/?page='+currentPage+'&limit='+pageLimit+ '&driver='+ str ,{
  //       headers,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.data)
    
  
        
  //     });
  // },[]);

  




  // const [open, setOpen] = React.useState(false);

  // const onOpenModal = (custs) =>   
  // {
  //   axios
  //   .get(`http://localhost:8080/api/ride/${custs}?populate=true`, {
  //     headers,
  //   })
  //   .then((res) => {

  //     console.log(res);
  //     setRideData(res.data)
  //    console.log(res.data)
  //    console.log(rideData)
  //   });
 
  //   setOpen(true); 
   
  // }
 
// const modelOpen =()=>{
//  return(
//   <Modal open={open} onClose={onCloseModal} center>
//   <div  style={{width: 500,height: 400}}>
//     {
// rideData.map((rideData) => {
 
//         return (
//           <div key={rideData._id}>
//           <p>{rideData.customer.city 
//             }</p>  
//               <p>{rideData.customer.city 
//             }</p>
//               <p>{rideData.customer.gender 
//             }</p>
//           </div>
//         );
//       })

//     }
//      <h2>Simple centered modal</h2>
//      </div>
//    </Modal>
//  )
 
// }
// console.log(rideData)
//   const onCloseModal = () => setOpen(false);
//   const handleClickOpen = (cust) => {

//     console.log(cust)
//     axios
//     .get(`http://localhost:8080/api/ride/${cust}?populate=true`, {
//       headers,
//     })
//     .then((res) => {
//       console.log(res);
//       setRideData(res.data)
//      console.log(res.data)
//       console.log(rideData)
 
//     })


    // setOpen(true);
    // modelOpen();
    // return(
    //   <div>
{/* <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal> */}

    {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      Modal title
    </DialogTitle>
    <DialogContent dividers>
      <Typography gutterBottom>

      
  
  
  
  
  
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </Typography>
      <Typography gutterBottom>
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
        lacus vel augue laoreet rutrum faucibus dolor auctor.
      </Typography>
      <Typography gutterBottom>
        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
        auctor fringilla.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose} color="primary">
        Save changes
      </Button>
    </DialogActions>
  </Dialog> */}
  
      {/* )




  };


// const modelOpen=()=>{ */}
{/* // return(
 
// )
  
// } */}


const history =useHistory();


  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
            {data &&
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
                      <GreenTooltip title="Detail" arrow>
                        <IconButton>
                          <DescriptionTwoToneIcon
                            color="primary"
                            onClick={()=>
                              history.push(`/admin/showcaptainRideDetail:${customer._id}`)
                            }
                          />
                        </IconButton>
                      </GreenTooltip>
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
