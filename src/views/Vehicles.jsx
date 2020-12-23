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
import EditIcon from '@material-ui/icons/Edit';
import {  toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
export default function Vehicles(props) {


  //for Pagination
  const [totalItemsCount, setTotalItemsCount] = useState();
  const [activePg, setActivePage] = useState(1);
  const [pageRange, setPageRange] = useState();
  const [data, setData] = useState([])
  const [PageLimit, setPageLimit] = useState(5)
  const [searchData, setSearchData] = useState("");
const [avalible,setAvalible]= useState('Unavailible')
const [currentPage, setCurrentPage] = useState();
  let token = localStorage.getItem('x-access-token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }

  const baseURL = "http://localhost:8080/api/admin";
  useEffect(() => {
    setPageRange(5)
//     axios.get(

//       `http://localhost:8080/api/vehicle/?limit=${PageLimit}&page=${activePg}`,
//       { headers }

//     )
//       .then(response => {

// console.log(response)
//         setPageRange(Math.ceil(response.data.count / PageLimit))
//         setTotalItemsCount(response.data.count)

     



//       })

      let one = `http://localhost:8080/api/vehicle/`;
      let two = `http://localhost:8080/api/category/`;
      const requestOne = axios.get(one, { headers });
      const requestTwo = axios.get(two, { headers });

      axios.all([requestOne, requestTwo]).then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
   
 

          getAllField(
            responseOne.data.data,
            responseTwo.data.data,
 console.log(responseOne),
 console.log(responseOne.data.count),

 setPageRange(Math.ceil(responseOne.data.count / PageLimit)),
 setTotalItemsCount(responseOne.data.count)
          )
     
         
        }),
    
  
      );
  }
    , [currentPage]);


    const getAllField = (vehicle, category) => {
      console.log(category);
      if(vehicle.length!==0){
      for (let i = 0; i < vehicle.length; i++) {
        for (let j = 0; j < category.length; j++) {
          if (category[j]._id == vehicle[i].category) {
            vehicle[i].categoryName = category[j].name;
          }
        }
      
      }
    }
  
      setData(vehicle);
    };


  const deleteItemFromState = (id) => {
    console.log(id)
    axios.delete(
      `http://localhost:8080/api/vehicle/${id}`,
      {
        headers
      }

    )
      .then(response => {
        const posts = data.filter((customer) => customer._id !== id);
        setData(posts);
        notifyDelete();
        
      })
  }


  const notifyDelete = ()=>{
    toast.error('vehicle deleted Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
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


  const showAvailble =(id,i)=>{
    console.log(id,i)
  axios.patch(  `http://localhost:8080/api/vehicle/${id}`, {isAvailable: true},
      {
        headers
      }
)
    
      .then(response => {
      console.log(response);   
    
  }
      )
      const newObj = data.find((item) => id == item._id);
        const obj1 = { ...newObj, isAvailable: true };
        data[i] = obj1;
        setData([...data]);
     
}


const handlePush= (userID)=>{
  console.log(userID)
  history.push(`/admin/addVehicles:${userID}`)
}

  const ActiveRenderBody = () => {

      return data.map((admin,i) => {
        {
   return (

              <tr key={admin._id} >

                <td>{admin.name}</td>
                <td>{admin.registration}</td>
                <td>{admin.make}</td>
                <td>{admin.categoryName}</td>
                <td>{admin.color}</td>
                <td>{admin.year}</td>
               
                {admin.isAvailable === true ? <td style ={{color: "blue"}}> {'Availible'  
} </td> : <td style ={{color: "red"}}> {'Unavalible'} { <Button variant="contained" color="primary" onClick={e => {
             showAvailble(admin._id,i)
            }}>
             Mark Availible
</Button> }</td>} 
                <td>  <IconButton>
                <ReactTooltip id = "edit" effect ="solid" backgroundColor ="green" />
                  <EditIcon data-for = "edit" data-tip = "Edit" color="primary" onClick={e => {
               handlePush(admin._id)
                  }

                  } /> </IconButton>
                  <IconButton>
                  <ReactTooltip id = "delete" effect ="solid" backgroundColor ="red" />
                    <DeleteIcon data-tip = "Delete" data-for = "delete" color="primary" onClick={e => {
                      deleteItemFromState(admin._id)
                    }

                    } />
                  </IconButton>
                </td>



              </tr>


            )
          }

      });

    }
    
  




  ////////////////////////////////////////////////


  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios.get(`http://localhost:8080/api/vehicle/?search=name&q=` + searchData, { headers })
      .then(response => {

        setData(response.data.data)


      })


  }


  let history = useHistory();



  // const handlePageChange = (pageNumber) => {
  //   console.log(pageNumber)
  //   axios.get(

  //     `http://localhost:8080/api/vehicle/?limit=${PageLimit}&page=${currentPage}`,
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

  return (

    <div  >
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>

          <div className="col-sm-8">
          <Button variant="contained" color="primary" onClick={e => {
              history.push('/admin/newaddVehicles')
            }}>
              Add New Vehicle
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
            <tr>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Name</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}scope="col">Registration</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }}scope="col">Make</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Category</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Color</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Year</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Avilability</th>
              <th style={{
                  textAlign: "center",
                  backgroundColor: "gray",
                  color: "white",
                  textEmphasisColor: "white",
                }} scope="col">Actions</th>
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
          activePage={currentPage}
          itemsCountPerPage={PageLimit}
          //Total record display on
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRange}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  )

}