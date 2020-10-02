import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';


import axios from 'axios';
import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
const BlockedAdminResult = (props) => {


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
      );
    
    }
    , []);
    
    const renderBody = () => {

        return data.map((admin) => {
    
       
              if (admin.isBlocked != false) {
    
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
            
           
    
            
        })
      }


    
      
    return (

<div>

<h1>hello bLock</h1>   
       
</div>
          

  
    );
        
}


export default BlockedAdminResult;
