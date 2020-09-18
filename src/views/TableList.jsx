
import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";



export default function TableList(props) {
  const [data, setData] = useState([])
  
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
  ,[]);
  const renderBody = () => {
    return data.map((admin) => {
        return (
            <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.mobile}</td>
                <td>{admin.gender}</td>
                <td>{admin.city}</td>
              
            </tr>
        )
    })
}
  return (
    <div>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  {renderBody()}
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
</div>
  )} 
  

