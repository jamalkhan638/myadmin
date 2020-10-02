import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';
import Pagination from "react-js-pagination";
import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { Line, Circle } from 'rc-progress';

export default function Rides(props) {


  //for Pagination
  const [totalItemsCount, setTotalItemsCount] = useState();
  const [activePg, setActivePage] = useState(1);
  const [pageRange, setPageRange] = useState();
  const [data, setData] = useState([])

  const [PageLimit, setPageLimit] = useState(5)
  const [searchData, setSearchData] = useState("");
  const [customerVar, setCustomerVar] = useState([])

  let token = localStorage.getItem('x-access-token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }

  const baseURL = "http://localhost:8080/api/admin";
  useEffect(() => {
    setPageRange(5)
    axios.get(

      `http://localhost:8080/api/ride`,
      { headers }

    )
      .then(response => {
     
        CustomerMobileField(response.data.data)
        DriverMobileField(response.data.data)
        CategoryMobileField(response.data.data)
       

      })


  }
    , []);

const CustomerMobileField= (data)=>{


  for (let i = 0; i < data.length; i++) {

    axios.get(
      `http://localhost:8080/api/customer/${data[i].customer}`,
      {
        headers
      })
      .then(response => {
        if (response.data) {
          let newData = []

          if (response.data._id === data[i].customer) {
         
            data[i].mobile = response.data.mobile;
          }
     
        }
      })
  }
}



const DriverMobileField= (data)=>{

  for (let i = 0; i < data.length; i++) {
   
    axios.get(
      `http://localhost:8080/api/driver/${data[i].driver}`,
      {
        headers
      })
      .then(response => {
        if (response.data) {
          if (response.data._id === data[i].driver) {
            console.log(1)
            data[i].driverNumber = response.data.mobile;
          }
        }
      })
  }
}


const CategoryMobileField= (data)=>{


  for (let i = 0; i < data.length; i++) {
   
    axios.get(
      `http://localhost:8080/api/category/${data[i].category}`,
      {
        headers
      })
      .then(response => {
        if (response.data) {
          let newData = []

          if (response.data._id === data[i].category) {
            
            data[i].cetegoryName = response.data.name;
          }
    
          setCustomerVar(data)
        }
      })
  }
}







  const ActiveRenderBody = () => {

    return customerVar.map((admin) => {

      {
        var date = new Date(admin.createdAt)
        


        return (

          <tr key={admin._id} >

            <td>{(new Date(admin.createdAt)).toLocaleDateString()}</td>
            <td>{(new Date(admin.createdAt)).toLocaleTimeString()}</td>
            <td>{admin.mobile}</td>
            <td>{admin.driverNumber}</td>
            <td>{admin.cetegoryName}</td>
            <td>{admin.city}</td>
            <td>active</td>
            <td>  <IconButton>
              <BlockIcon color="primary" 
              

               /> </IconButton>
              <IconButton>
                <DeleteIcon color="primary" 
                

                 />
              </IconButton>
            </td>



          </tr>


        );
      }



    });


  }




  ////////////////////////////////////////////////


  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.get(`http://localhost:8080/api/admin/?search=name&q=` + searchData, { headers })
      .then(response => {

        setData(response.data.data)


      })


  }


  let history = useHistory();



  const handlePageChange = (pageNumber) => {
   
    axios.get(

      `http://localhost:8080/api/admin/?limit=${PageLimit}&page=${pageNumber}`,
      { headers }

    )
      .then(response => {


        setData(response.data.data)



      },
        (error) => {
          var status = error.response.status
          console.log(error)
        }
      );

    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber)

  }

  return (

    <div  >
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


              <form onSubmit={handleSubmit} >
                <input className="form-control-borderless" type="search" placeholder="Search " value={searchData} onChange={e => setSearchData(e.target.value)} />

                <button className="btn btn-sm btn-success" type="submit">Search</button>

              </form>
            </span>

          </div>
        </div>


      </div>
      <card grid>
        <table className="table table-bordered table-condensed table-responsive table-m8" style={{ margin: "20px", width: "95%" }} >
          <thead>
            <tr style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }}>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Date</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Time</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">CustomerVar Mobile</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Dirver Mobile</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Category</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Status</th>
              <th style={{ textAlign: "center", backgroundColor: 'gray', color: "white", textEmphasisColor: "white" }} scope="col">Action</th>
            </tr>
          </thead>
          <tbody >
            {
              ActiveRenderBody()
            }


          </tbody>
        </table>
      </card>
      <div style={{ marginLeft: "20px" }}>
        <Pagination
          activePage={activePg}
          itemsCountPerPage={PageLimit}
          //Total record display on
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRange}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )

}


