import React from 'react';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';

import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { ProgressBar } from 'react-bootstrap';
const ActiveAdminRecord = (props) => {
          if( props.state === false )
          {
              return 
          }
    const renderBody = () => {

        return props.admin.map((admin) => {
    
       
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
            
           
    
            
        })
      }



    return (
        <div>
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
          
            {renderBody()}

          
        
      
    </div>
  
    );
        
}


export default ActiveAdminRecord;
