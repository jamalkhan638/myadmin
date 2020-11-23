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
import Loader from 'react-loader-spinner'

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
const  pageLimit = 50
export default function CustomerRide(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
 const[totalRecords, setTotalRecords]=useState()
 const [currentPage, setCurrentPage]= useState(1)
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
      .get(`http://localhost:8080/api/ride?populate=true/${str}&limit=${pageLimit}&page=${currentPage}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data)
        setTotalRecords(res.data.count)
        // setPageRange(Math.ceil(res.data.count / PageLimit))
        // setTotalItemsCount(res.data.count)

        
      });
  }, [currentPage]);

  



  // const handlePageChange = (pageNumber) => {
  //   console.log(pageNumber)
  //   axios.get(

  //     `http://localhost:8080/api/category/?limit=${PageLimit}&page=${pageNumber}`,
  //     { headers }

  //   )
  //     .then(response => {


  //       setData(response.data.data)



  //     },
  //       (error) => {
  //         var status = error.response.status
  //         console.log(error)
  //       }
  //     );

  //   console.log(`active page is ${pageNumber}`);
  //   setActivePage(pageNumber)

  // }
  // const handleChange = (val) => {
  //   setSearchInput(val);
  //   axios
  //     .get(`http://localhost:8080/api/category/?search=name&q=` + searchInput, {
  //       headers,
  //     })
  //     .then((res) => {
  //       setData(res.data.data);
  //       setLoading(false);
  //     });
  // };


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
 <div>
   {data ?

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
              <th   style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Date</th>
              <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Time</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Customer Mob</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Driver Mob</th>
              <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}scope="col">Category</th>
              <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Status</th>
              <th  style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}} scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((customer) => {
                return (
                  <tr Key={customer._id}>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(customer.createdAt).toLocaleTimeString()}</td>
                    {(customer.customer)? <td>{customer.customer.mobile}</td>:<td>N/A</td>}
                    {(customer.driver)? <td>{customer.driver.mobile}</td>:<td>N/A</td>}
                   
                    <td>{customer.category.name}</td>
                    {(customer.status=== "notAssigned")? <td style={{color:"blue" }}>{customer.status}</td>: <td style={{color:"green" }}>{customer.status}</td> }
                   
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
      <div className="d-flex flex-row py-4 justify-content-end"  style={{ marginLeft: "20px" }}>
              <Pagination
                totalRecords={totalRecords}
                pageLimit={pageLimit}
                pageRangeDisplayed={1}
                onChangePage={setCurrentPage}
      />
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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
        :   <div style={{marginLeft : 450, marginTop: 80, marginBottom: 50}}>  <Loader
        type="Puff"
 color="grey"
 height={100}
 align = "centre"
 width={100}
 margin ="500px"
 timeout={3000}
 visible={true} //3 secs

/>

</div>  }
</div>
  );
}
