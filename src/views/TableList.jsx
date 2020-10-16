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

export default function TableList(props) {


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

  const baseURL = "http://localhost:8080/api/admin";
  useEffect(() => {
    setPageRange(5)
    axios.get(

      `http://localhost:8080/api/admin/?limit=${PageLimit}&page=${activePg}`,
      { headers }
    )
      .then(response => {
        setPageRange(Math.ceil(response.data.count / PageLimit))
        setTotalItemsCount(response.data.count)
        setData(response.data.data)

      })


  }
    , []);


  const deleteItemFromState = (id) => {
    console.log(id)
    axios.delete(
      `http://localhost:8080/api/admin/${id}`,
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

  const BlockItemFromState = (admin) => {
    
    axios.patch(
      `http://localhost:8080/api/admin/block/${admin._id}`,{},
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

    if (data != undefined && data != null) {
      return data.map((admin) => {

        {

          if (admin.isBlocked != true) {

            return (

              <tr key={admin._id} >

                <td>{admin.name}</td>
                <td>{admin.mobile}</td>
                <td>{admin.email}</td>
                <td>{admin.accessLevel}</td>
                <td>{admin.gender}</td>
                <td>{admin.city}</td>
                <td>active</td>
                <td>  <IconButton>
                  <BlockIcon color="primary" onClick={e => {
                    BlockItemFromState(admin)
                  }

                  } /> </IconButton>
                  <IconButton>
                    <DeleteIcon color="primary" onClick={e => {
                      deleteItemFromState(admin._id)
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

    axios.get(`http://localhost:8080/api/admin/?search=name&q=` + searchData, { headers })
      .then(response => {

        setData(response.data.data)


      })


  }


  let history = useHistory();



  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
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

          <div className="col-sm-8">
            <Button variant="outlined" color="primary" onClick={e => {
              history.push('/admin/user')
            }}>
              Add Admin
</Button>

          </div>
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
            <tr style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Name</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Mobile</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Email</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Roll</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Gender</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">City</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Status</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Action</th>
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