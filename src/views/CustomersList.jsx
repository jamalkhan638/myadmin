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


export default function CustomerList(props) {


  //for Pagination
  const [totalItemsCount, setTotalItemsCount] = useState();
  const [activePg, setActivePage] = useState(1);
  const [pageRange, setPageRange] = useState();
  const [data, setData] = useState([])
  const [PageLimit, setPageLimit] = useState(5)
  const [searchData, setSearchData] = useState("");

  let token = localStorage.getItem('x-access-token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }

  useEffect(() => {
    setPageRange(5)
    axios.get(

      `http://localhost:8080/api/customer/?limit=${PageLimit}&page=${activePg}`,
      { headers }

    )
      .then(response => {
      console.log(response)

        setPageRange(Math.ceil(response.data.count / PageLimit))
        setTotalItemsCount(response.data.count)

        setData(response.data.data)



      })


  }
    , []);


  const deleteItemFromState = (id) => {
    console.log(id)
    axios.delete(
      `http://localhost:8080/api/customer/${id}`,
      {
        headers
      }

    )
      .then(response => {
        alert(response.data.msg)
      },
        (error) => {
          var status = error.response.status
          console.log(error)
        }
      );
  }

  const BlockItemFromState = (customer) => {
    
    axios.patch(
      `http://localhost:8080/api/customer/block/${customer._id}`,{},
      {
        headers
      }

    )
      .then(response => {
    
        alert(response.data.message)



      },
        (error) => {
          var status = error.response.status
          console.log(status)
        }
      );



  }

  const ActiveRenderBody = () => {
console.log(data)
    if (data != undefined && data != null) {
      return data.map((customer) => {

        {

          if (customer.isBlocked != true) {

            return (

              <tr key={customer._id} >

                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.email}</td>
                <td>{customer.gender}</td>
                <td>{customer.city}</td>
                <td>active</td>
                <td>  <IconButton>
                  <BlockIcon color="primary" onClick={e => {
                    BlockItemFromState(customer)
                  }

                  } /> </IconButton>
                  <IconButton>
                    <DeleteIcon color="primary" onClick={e => {
                      deleteItemFromState(customer._id)
                    }

                    } />
                  </IconButton>
                </td>



              </tr>


            )
          }

        }


      })
    }
  }




  ////////////////////////////////////////////////


  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.get(`http://localhost:8080/api/customer/?search=name&q=` + searchData, { headers })
      .then(response => {

        setData(response.data.data)


      })


  }


  let history = useHistory();



  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    axios.get(

      `http://localhost:8080/api/customer/?limit=${PageLimit}&page=${pageNumber}`,
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
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
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