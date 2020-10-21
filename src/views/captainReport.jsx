import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "reactjs-hooks-pagination";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { dataPie } from "variables/Variables";
import DescriptionTwoToneIcon from "@material-ui/icons/DescriptionTwoTone";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

export default function CaptainReport(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  
  
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
      .get(`http://localhost:8080/api/complaint?driver=${str}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data)
        
      });
  }, []);






  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          className="table table-bordered table-condensed table-responsive table-m8 "
          style={{ margin: "20px", width: "95%" }}
        >
          <thead  >
            <tr>
              <th   style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Subject</th>
              <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Discription</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">status</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Created At</th>
               <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((customer) => {
                return (
                  <tr Key={customer._id}>
                       <td>{customer.complaintSubject}</td>
                       <td>{customer.complaintBody}</td>
                       {(customer.status=== "pending")? <td style={{color:"blue" }}>{customer.status}</td>: <td style={{color:"green" }}>{customer.status}</td> }
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                   
                            
                   
                    <td>
                      {" "}
                      <GreenTooltip title="Detail" arrow>
                        <IconButton>
                          <DescriptionTwoToneIcon
                            color="primary"
                            onClick={handleOpen}
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
      {/* <div className="d-flex flex-row py-4 justify-content-end">
        <Pagination
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          pageRangeDisplayed={1}
          onChangePage={setCurrentPage}
        />
      </div> */}

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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}