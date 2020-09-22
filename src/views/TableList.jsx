
import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';

import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';


export default function TableList(props) {
  const [data, setData] = useState([])
  const [searchData,setSearchData]=useState("");
  const [status, setStatus] = useState();
  let token = localStorage.getItem('x-access-token');
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }

  const baseURL = "http://localhost:8080/api/admin";
  useEffect(() => {

    axios.get(
      baseURL,
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
  }
    , []);


  const deleteItemFromState = (id) => {
    axios.patch(
      baseURL + `block/${id}`,
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



  }


  const renderBody = () => {
    return data.map((admin) => {

      {
        if (status === true || status === undefined) {
          if (admin.isBlocked != true) {

            return (

              <tr Key={admin.id} >

                <td>{admin.name}</td>
                <td>{admin.mobile}</td>
                <td>{admin.email}</td>
                <td>{admin.accessLevel}</td>
                <td>{admin.gender}</td>
                <td>{admin.city}</td>
                <td>active</td>
                <td>  <IconButton>
                  <BlockIcon color="primary" /> </IconButton>
                  <IconButton>
                    <DeleteIcon color="primary" onClick={e => {
                      console.log(admin.id)
                    }

                    } />
                  </IconButton>
                </td>



              </tr>


            )
          }
        }
        {
          if (status === false) {
            if (admin.isBlocked != false) {

              return (

                <tr Key={admin.id}>

                  <td>{admin.name}</td>
                  <td>{admin.mobile}</td>
                  <td>{admin.email}</td>
                  <td>{admin.accessLevel}</td>
                  <td>{admin.gender}</td>
                  <td>{admin.city}</td>
                  <td>Blocked</td>
                  <td>  <IconButton >
                    <BlockIcon color="primary" />
                  </IconButton>
                    <IconButton>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </td>



                </tr>


              )
            }

          }

        }
      }
    })
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
   
    console.log(searchData)
    axios.get(`http://localhost:8080/api/admin/?search=name&q=`+searchData,   { headers })
      .then(response => {
setData(response.data.data)
       

      })

  }


  let history = useHistory();

  return (

    <div  >
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>

          <div className="col-sm-8">
            <Button disabled={false} variant="outlined" size="medium" onClick={e => {
              
              history.push('/admin/table')
              window.location.reload();
            }} color="primary"  >
              Active
</Button>



            <Button variant="outlined" color="primary" onClick={e => {
              setStatus(false)
              history.push('/admin/table')

            }}>
              Block
</Button>
          </div>
          <div className="col-sm-4">
       

            <span>
            <Button variant="outlined" color="primary" onClick={e => {
             history.push('/admin/user')

          }}>
            Add Admin
</Button>

              <form onSubmit={handleSubmit} > 
                 <input className="form-control-borderless" type="search" placeholder="Search " value={searchData} onChange={e=>setSearchData(e.target.value)} />

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
              <th scope="col">Roll</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody >
            {renderBody()}

          </tbody>
        </table>
      </card>
    </div>
  )

}
