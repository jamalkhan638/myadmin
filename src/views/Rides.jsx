import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import BlockIcon from "@material-ui/icons/Block";
import Pagination from "react-js-pagination";
import { FormatAlignCenter, CategoryOutlined } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { Line, Circle } from "rc-progress";
import TrackChangesTwoToneIcon from '@material-ui/icons/TrackChangesTwoTone';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';

export default function Rides(props) {
  //for Pagination
  
  // const [activePg, setActivePage] = useState(1);
  const [pageRange, setPageRange] = useState();
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [PageLimit, setPageLimit] = useState(5);
  const [searchData, setSearchData] = useState("");
  const [customerVar, setCustomerVar] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activePg, setActivePage] = useState(1);
  const [PageLimit, setPageLimit] = useState(50)
  const [totalItemsCount, setTotalItemsCount] = useState();
  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  const baseURL = "http://localhost:8080/api/admin";
  useEffect(() => {
    setPageRange(5)
  
    let one = `http://localhost:8080/api/ride/?limit=${PageLimit}&page=${currentPage}`;
    let two = `http://localhost:8080/api/customer/`;
    let three = `http://localhost:8080/api/driver/`;
    let four = `http://localhost:8080/api/category/`;

    const requestOne = axios.get(one, { headers });
    const requestTwo = axios.get(two, { headers });
    const requestThree = axios.get(three, { headers });
    const requestFour = axios.get(four, { headers });

    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responseThree = responses[2];
        const responseFour = responses[3];
        setTotalRecords(responseOne.data.count);
        setPageRange(Math.ceil(responseOne.data.count / PageLimit))
        setTotalItemsCount(responseOne.data.count)
        console.log(responseFour);
        CustomerMobileField(
          responseOne.data.data,
          responseTwo.data.data,
          responseThree.data.data,
          responseFour.data.data
         
        );
        console.log(responseOne)
        console.log(responseTwo)
        console.log(responseThree)
        console.log(responseFour)
        
      })
     
    );
 
 
  }, [currentPage]);

  const CustomerMobileField = (ride, customer, driver, category) => {
    console.log(category);
    for (let i = 0; i < ride.length; i++) {
      for (let j = 0; j < customer.length; j++) {
        if (customer[j]._id == ride[i].customer) {
          ride[i].customerMobile = customer[j].mobile;
        }
      }
      for (let k = 0; k < driver.length; k++) {
        if (driver[k]._id == ride[i].driver) {
          ride[i].driverMobile = driver[k].mobile;
        }
      }
      for (let l = 0; l < category.length; l++) {
        if (category[l]._id == ride[i].category) {
          ride[i].categoryName = category[l].name;
        }
      }
    }

    setCustomerVar(ride);
    console.log(ride)
  
  };

  let history = useHistory();

  const inputState =(userid)=>{
    console.log(userid)
 
    history.push(`/admin/input:${userid}`)
    
  };
  
  const ActiveRenderBody = () => {
    return customerVar.map((admin) => {
      {
        // var date = new Date(admin.createdAt)

        return (
          <tr key={admin._id}>
            <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
            <td>{new Date(admin.createdAt).toLocaleTimeString()}</td>
        <td>{ (admin.customerMobile )? <td>{admin.customerMobile}</td>: <td>N/A</td>} </td>

            <td>{ (admin.driverMobile) ? <td>{admin.driverMobile}</td>: <td>N/A</td>}</td>
            <td>{admin.categoryName}</td>
            <td>
              {admin.status=== "accepted" ? <td style ={{color :"green"}}>{admin.status}</td>: 
            admin.status=== "notAssigned" ? <td style= {{ color :" red"}}>{admin.status}</td> : 
            <td style= {{color :"blue"}}>{admin.status}</td> } 
            </td>
            <td>
              {" "}
             
              <IconButton>
                <ReactTooltip id = "delete" effect ="solid"  backgroundColor ="red" />
                <DeleteIcon color="primary" 
                data-tip ="Delete"
                data-for= "delete"
                onClick ={()=>handleDelete(admin._id)} />
              </IconButton>
              <IconButton>
              <ReactTooltip id = "assign" effect ="solid" backgroundColor ="green" />
              <TrackChangesTwoToneIcon color ="primary"
              data-tip = " Show Driver And Assign Ride" 
              data-for = "assign"
               onClick={e => {
                      inputState(admin._id)
                      }}/>
              
              </IconButton>
              
            </td>
          </tr>
        );
      }
    });
  };

  ////////////////////////////////////////////////

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .get(`http://localhost:8080/api/admin/?search=name&q=` + searchData, {
        headers,
      })
      .then((response) => {
        setData(response.data.data);
      });
  };

  const handleDelete = (id)=>{
    axios.delete(`http://localhost:8080/api/ride/${id}`, {headers})
   .then((res)=>{
    console.log(res) 
    const posts = data.filter((customer) => customer._id !== id);
    setData(posts);
    notifyDelete();
   })
  }

  // const handlePageChange = (pageNumber) => {
  //   axios
  //     .get(
  //       `http://localhost:8080/api/admin/?limit=${PageLimit}&page=${pageNumber}`,
  //       { headers }
  //     )
  //     .then(
  //       (response) => {
  //         setData(response.data.data);
  //       },
  //       (error) => {
  //         var status = error.response.status;
  //         console.log(error);
  //       }
  //     );

  //   console.log(`active page is ${pageNumber}`);
  //   setActivePage(pageNumber);
  // };

  const notifyDelete = ()=>{
    toast.error('Ride deleted Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


  return (
    <div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          {/* <div className="col-sm-8">
            <Button variant="outlined" color="primary" onClick={e => {
              history.push('/admin/user')
            }}>
              Add Admin
</Button>
          </div> */}
          <div className="col-sm-4">
            <span>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control-borderless"
                  type="search"
                  placeholder="Search "
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />

                <button className="btn btn-sm btn-success" type="submit">
                  Search
                </button>
              </form>
            </span>
          </div>
        </div>
      </div>
      <card grid>
        <table
          className="table table-bordered table-condensed table-responsive table-m8"
          style={{ margin: "20px", width: "95%" }}
        >
          <thead>
            <tr
              style={{
                textAlign: "center",
                backgroundColor: "gray",
                color: "white",
                textEmphasisColor: "white",
              }}
            >
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                Date
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                Time
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                CustomerVar Mobile
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                Dirver Mobile
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                Category
              </th>
              <th
                style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
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
                  textEmphasisColor: "white",
                }}
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>{ActiveRenderBody()}</tbody>
        </table>
      </card>
      <div style={{ marginLeft: "20px" }}>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={PageLimit}
          //Total record display on
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRange}
          onChange={setCurrentPage}
        />
      
          {/* <div className="d-flex flex-row py-4 justify-content-end">
        <Pagination
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          pageRangeDisplayed={1}
          onChangePage={setCurrentPage}
        />
      </div> */}
      </div>
    </div>
  );
}
