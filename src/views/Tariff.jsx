import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import Pagination from "react-js-pagination";
import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import AddTariff from './AddTariff';


export default function Tariff(props) {


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

      `http://localhost:8080/api/category/?limit=${PageLimit}&page=${activePg}`,
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

  const EditItemFromState = (category) => {
    
    axios.patch(
      `http://localhost:8080/api/category/${category._id}`,{},
      {
        headers
      }

    )
    
      .then(response => {

        
    console.log(response.data)
        alert(response.data.message)



      },
        (error) => {
          var status = error.response.status
          console.log(status)
        }
      );



  }

  const ActiveRenderBody = () => {

   
      return data.map((category) => {

        {
            return (

              <tr key={category._id} style={{  height: "10px"}}  >

                <td  >{category.name}</td>
                <td>{category.ttl} sec</td>
                <td>{category.charges.base} PKR</td>
                <td>{category.charges.perKm} Mins</td>
                <td>{category.charges.waiting} PKR</td>
                <td>{category.charges.waitingOnLoading} Mins</td>
                <td>{category.charges.waitingOnUnloading} PKR</td>
                <td>{category.loadingMins} PKR</td>
                <td>{category.unloadingMins} PKR</td>
                <td>{category.earning.driver} %</td>
                <td>{category.earning.company} %</td>
                
                <td>  <IconButton>
                <EditIcon color="primary" onClick={e => {
                        EditItemFromState(category)
                      }

                    } />
                
             </IconButton>
             </td>
             <td>
         <IconButton>
               

<DeleteIcon color="primary" onClick={e => {
                      deleteItemFromState(category._id)
                    
                      }

                  } /> 
                  </IconButton>
                  
                </td>



              </tr>


            )
          

        }


      })
 
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

      `http://localhost:8080/api/category/?limit=${PageLimit}&page=${pageNumber}`,
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
              history.push('/admin/addTariff')
            }}>
              Add New Tariff
</Button>

          </div>
        
        </div>


      </div>
      <card grid >
        <table className="table table-bordered table-condensed table-responsive " style={{ width: "90%",  borderCollapse:"collapse", margin:"2%" }} >
          <thead >
            <tr >
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Catagory</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Acceptance Time</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Charges Base</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Loading grace mins</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Charges Loading (Per min)</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Unloading grace mins</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Charges Unloading (Per min)</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Charges Per KM</th> 
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Charges Congestion (Per min)</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Driver's Earning</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}  scope="col">Company's Earning</th>
              <th style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , border:"none"}}   colspan="2" scope="col">Actions</th>
             
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