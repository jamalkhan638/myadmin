import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';
import Pagination from "reactjs-hooks-pagination";
import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { Line, Circle } from 'rc-progress';
import EditIcon from '@material-ui/icons/Edit';
import FaceIcon from '@material-ui/icons/Face';
import Loader from 'react-loader-spinner'
import ReactTooltip from 'react-tooltip';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 const pageLimit = 3;
 toast.configure()
export default function Captain(props) {


  //for Pagination

  const [totalRecords, setTotalRecords] = useState();
  const [currentPage,setCurrentPage] = useState(1);
 
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState("");
  const [status,setStatus]=useState()
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  let token = localStorage.getItem('x-access-token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }

  
  useEffect(() => {
  
    // axios.get(

    //   `http://localhost:8080/api/driver/?limit=${PageLimit}&page=${activePg}`,
    //   { headers }

    // )
    //   .then(response => {


    //     setPageRange(Math.ceil(response.data.count / PageLimit))
    //     setTotalItemsCount(response.data.count)

    //     setData(response.data.data)


    // "http://localhost:8080/api/customer/?page=" +   currentPage +    "&limit=" +  pageLimit
    //   })
      let one = "http://localhost:8080/api/driver/?page=" + currentPage +    "&limit=" +  pageLimit
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
           console.log(responseOne)
           setTotalRecords(responseOne.data.count)
          getAllField(
            responseOne.data.data,
            responseTwo.data.data,
            responsethree.data.data
          );
        })
      );
  

  }
    , [currentPage]);
  const getAllField = (driver, vehicle,category) => {
      console.log(driver);
   
 if(driver){

      
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
    }
    
  console.log(driver)
      setData(driver);
    };



    const inputState =(userid)=>{
      console.log(userid)
      history.push(`/admin/captainProfile:${userid}`)
      
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
        notifyDelete()
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

        notifyBlocked()


      },
        (error) => {
          var status = error.response.status
          console.log(status)
        }
      );

  }


  
  const notifyBlocked = () => {
  
      console.log("notify")
      toast.dark(' Captain blocked Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    
  
    

  }
  const notifyDelete = ()=>{
    toast.error('Captain delete Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }


  const handleChange = (val) => {
    setSearchInput(val);
    axios
      .get(`http://localhost:8080/api/driver/?search=name&q=` + searchInput, {
        headers,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
  };


  const ActiveRenderBody = () => {

    if ( data != null) {
      return data.map((driver) => {
        console.log(driver)
        {

            return (
           
        <tr key={driver._id} >

                <td>{driver.name}</td>
                <td>{driver.mobile}</td>
                <td>{driver.categoryName}</td>
                <td>{driver.vehicleName}</td>
                <td>{driver.city}</td>
             
            <td>{ driver.isBlocked === true ? <td>block</td> : <td>active</td>}</td>
                <td style={{textAlign:"center" }}>  
                
                <IconButton>
            


                <ReactTooltip id ="block" effect ="solid" backgroundColor= "black" />
                  <BlockIcon color="primary" 
                         data-tip ="Block"
                         data-for = "block"
                       onClick={e => {
                    BlockItemFromState(driver); 
                  }}
                 /> </IconButton>
                    
                  <IconButton>
                  <ReactTooltip id ="delete" effect="float"  backgroundColor ="red"/>
                    <DeleteIcon color="primary"
                       data-for ="delete"
                        data-tip= "Delete"
                     onClick={e => {
                      deleteItemFromState(driver._id)
                    }

                    } />
                    
                  </IconButton>
                  <IconButton>
                  <ReactTooltip id ="edit" effect="float"  backgroundColor ="blue"/>
                    <EditIcon color="primary"
                     data-for ="edit"
                     data-tip= "Edit"
                   onClick={() =>
                    history.push(`/admin/editCaptain:${driver._id}`)
                  }

                     />
                  </IconButton>
                  <IconButton>
                  <ReactTooltip id ="profile" effect="solid"  backgroundColor ="green"/>
                    <FaceIcon 
                     data-for ="profile"
                     data-tip= "Profile"
                    color="primary" onClick={e => { inputState(driver._id)
                    }

                    } />
                  </IconButton>
                  {/* <Button onclick  ={notify()}>
                    notify
                  </Button> */}
                </td>



              </tr>


            )
          

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



  // const handlePageChange = (pageNumber) => {
  //   console.log(pageNumber)
  //   axios.get(

  //     `http://localhost:8080/api/driver/?limit=${PageLimit}&page=${pageNumber}`,
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

  

  return (
   

    
    <div >
 
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


            <div className="col-sm-4">
            <div>
              <label>Search</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
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
            
              {   data  ?  ActiveRenderBody()  : 
                <div style={{marginLeft : 450, marginTop: 80, marginBottom: 50}}>  <Loader
                type="Puff"
         color="grey"
         height={100}
         align = "centre"
         width={100}
         margin ="500px"
         timeout={3000}
         visible={true} //3 secs
     
      />
     
     </div> 
     
      }
              
            


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
    </div>

  )

}