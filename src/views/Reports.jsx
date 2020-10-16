import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid, Row, Col, Table } from "react-bootstrap";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Pagination from 'reactjs-hooks-pagination';
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
let query = "driver";
let status = "resolve";
// let driverColor = "primary"
// let customerColor = "";

export default function Reports(props) {
  const [data, setData] = useState([]);
 
  const [customerColor, setCustomerColor] = useState();
  const [driverColor, setDriverColor] = useState();
  // const [status,setStatus] = useState()

  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  const queryFunc = (data) => {
    
    axios
      .get(`http://localhost:8080/api/complaint?from=${data}`, { headers })
      .then(
        (res) => {
         
          setData(res.data.data);
          if (data === "driver") {
            setDriverColor("primary");
            setCustomerColor("");
          } else if (data === "customer") {
            setCustomerColor("primary");
            setDriverColor("");
          }
        }

       
      );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/complaint?from=${query}`, { headers })
      .then(
        (res) => {
        
          setData(res.data.data);
          setDriverColor("primary");
        }

        //    (error) => {
        //     var status = error.res.status
        //     console.log(error)
        //   }
      );
  }, []);

  const handleStatus = (id) => {
    let obj = {
      status: "solved",
    };
    axios
      .patch(`http://localhost:8080/api/complaint/${id}`, obj, { headers })
      .then((res) => {
        // console.log(res.data);
      });
  };

  const renderButton = (id) => {
    return (
      <DoneOutlineIcon
        title="Solve"  
        color="primary"
        onClick={() => handleStatus(id)}
        // onClick={()=>setStatus('resolve')}
      />
    );
  }
  

  const renderButton1 = (id) => {
    return (
      <BlockIcon
      title="Solve"
        color="primary"
        onClick={() => handleStatus(id)}
        // onClick={()=>setStatus('resolve')}
      />
    );
  };

  const handleRemove =(id)=>{
    axios.delete(`http://localhost:8080/api/complaint/${id}`, { headers })
    .then(res => {
      
      const posts = data.filter(complain => complain._id !== id);
      setData(posts);

      
    })
   
  }

 
  const renderComplaints = () => {
    // console.log(customData)
  if(data!=undefined)
  {
    return data.map((complain) => {

    
      console.log(complain);

      return (
        <tr key={complain._id}>
          <td>{complain.complaintSubject}</td>
          <td>{complain.complaintBody}</td>
          <td>{complain.status}</td>
          <td>{new Date(complain.createdAt).toLocaleDateString()}</td>
          <td>
            {" "}
            <IconButton color="primary" title= "solve" onClick={() => renderButton1()}
             > 
           
              {complain.status === "solved" ? renderButton(complain._id) : renderButton1(complain._id)}{" "}
            </IconButton>
            
            <IconButton color="primary" onClick={()=>handleRemove(complain._id)}   >
           
              <DeleteIcon 
               />
            
            </IconButton>
          </td>
        </tr>
      );
    });
  }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className="col-sm-8">
            <Button
              disabled={false}
              onClick={() => queryFunc("customer")}
              variant="contained"
              size="medium"
              color={customerColor}
            >
              Customer
            </Button>

            <Button
              variant="outlined"
              color={driverColor}
              variant="contained"
              onClick={() => queryFunc("driver")}
            >
              Driver
            </Button>
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
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                }}
                scope="col"
              >
                Subject
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                }}
                scope="col"
              >
                Discription
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                }}
                scope="col"
              >
                Status
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                }}
                scope="col"
              >
                CreatedAt
              </th>
              <th
                style={{
                  textAlign: "centre",
                  backgroundColor: "grey",
                  color: "white",
                }}
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderComplaints()}</tbody>
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
  );
}

