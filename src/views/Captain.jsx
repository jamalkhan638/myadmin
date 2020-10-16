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
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
export default function Captain(props) {


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
    // axios.get(

    //   `http://localhost:8080/api/driver/?limit=${PageLimit}&page=${activePg}`,
    //   { headers }

    // )
    //   .then(response => {


    //     setPageRange(Math.ceil(response.data.count / PageLimit))
    //     setTotalItemsCount(response.data.count)

    //     setData(response.data.data)



    //   })
      let one = `http://localhost:8080/api/driver/?limit=${PageLimit}&page=${activePg}`;
      let two = `http://localhost:8080/api/vehicle/`;
      let three = `http://localhost:8080/api/category/`;
      const requestOne = axios.get(one, { headers });
      const requestTwo = axios.get(two, { headers });
      const requestthree = axios.get(three, { headers });

      axios.all([requestOne, requestTwo,requestthree]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responsethree = responses[2];
 
          getAllField(
            responseOne.data.data,
            responseTwo.data.data,
            responsethree.data.data
          );
        })
      );
  

  }
    , []);
  const getAllField = (driver, vehicle,category) => {
      console.log(driver);
      for (let i = 0; i < driver.length; i++) {
        for (let j = 0; j < vehicle.length; j++) {
          if (vehicle[j]._id ===driver[i].vehicle) {

            console.log(vehicle[j]._id)

            driver[i].vehicleName = vehicle[j].name;

            for (let l = 0; l < category.length; l++) {
              if (category[l]._id == vehicle[j].category) {
                driver[i].categoryName = category[l].name;
              }
            }
          }
        }
      
      }
  console.log(driver)
      setData(driver);
    };


  const deleteItemFromState = (id) => {
    console.log(id)
    axios.delete(
      `http://localhost:8080/api/driver/${id}`,
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

  const BlockItemFromState = (driver) => {
    
    axios.patch(
      `http://localhost:8080/api/driver/block/${driver._id}`,{},
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
      return data.map((driver) => {

        {

          if (driver.isBlocked != true) {

            return (

              <tr key={driver._id} >

                <td>{driver.name}</td>
                <td>{driver.mobile}</td>
                <td>{driver.categoryName}</td>
                <td>{driver.vehicleName}</td>
                <td>{driver.city}</td>
                <td>active</td>
                <td style={{textAlign:"center" }}>  <IconButton>
                  <BlockIcon color="primary" onClick={e => {
                    BlockItemFromState(driver)
                  }

                  } /> </IconButton>
                  <IconButton>
                    <DeleteIcon color="primary" onClick={e => {
                      deleteItemFromState(driver._id)
                    }

                    } />
                  </IconButton>
                  <IconButton>
                    <EditIcon color="primary" onClick={e => {
                      deleteItemFromState(driver._id)
                    }

                    } />
                  </IconButton>
                  <IconButton>
                    <FaceIcon color="primary" onClick={e => {
                      deleteItemFromState(driver._id)
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

    axios.get(`http://localhost:8080/api/driver/?search=name&q=` + searchData, { headers })
      .then(response => {

        setData(response.data.data)


      })


  }


  let history = useHistory();



  const handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    axios.get(

      `http://localhost:8080/api/driver/?limit=${PageLimit}&page=${pageNumber}`,
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
              history.push('/admin/addCaptain')
            }}>
              Add Captain
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
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">Category</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" ,textEmphasisColor:"white"}}  scope="col">vehicle</th>
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