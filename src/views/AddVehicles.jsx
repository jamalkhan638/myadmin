import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import '../components/loginForn/Login.css'
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import  "../assets/css/header.css"
import { BorderAllRounded, Category } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: 200,
      
      
    },
  },
}));
export default function AddVehicles(props) {
  const classes = useStyles();

  const [name, setName] = useState('')
  const [regYear, setRestrationYear] = useState('')
  const [Color, setColor] = useState('')
  const [Manufacture, setManufacture] = useState('')
  const [PlateNumber, setPlateNumber] = useState('')
  const [Category, setCategory] = useState([])
  const[selectedTeam,setSelectedTeam]=useState("Select Category")
  const [selectId,setSelectId]=useState('')


  let history = useHistory();
 

  useEffect(() => {
    
    axios.get(`http://localhost:8080/api/category`,{headers:headers})
    .then(response => {
 setCategory(response.data.data)
}
  

    )
  
    
    }
    , []);


  let token = localStorage.getItem('x-access-token');

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }
  const handleCancel = (evt) => {
    history.push('/admin/tariff')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(selectId)
    const user = {
            name:name,
            year:regYear,
             
            color:Color,
            make:Manufacture,
            registration:PlateNumber,
            category:"5f561b7183171d34ac9c9b64"

           

      
      

    };
   
    axios.post(`http://localhost:8080/api/vehicle`, user,{headers:headers})
      .then(response => {
        if(response.data.message)
        {
           console.log(response.data)
        alert(response.data.message);
        
        }
    else{
      console.log(response.data)
      alert(response.data.message);
    }
});
  }


  

  return (
    <div className="container-fluid" style={{
      alignContent: "center",
      content:"center",
     
    }}>
   
               
    <div className="row" style={{  margin: "10px" }}>
    <div className="col-sm-12 " style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , borderRadius:"5px"}} >
                  <h3>Vehicles</h3>
                </div>
                </div>
    
    <form  onSubmit={handleSubmit}>

    <div className="row" style={{  marginTop: "10px" }}>
    <div className="col-sm-10">
    <h4>Vehicles details</h4>
    </div>
    <div className="col-sm-2">
    <button type="submit" className="btn btn-secondry btn-sm" style={{marginTop:"20px"}} onClick={handleCancel}>
       Cancel
    </button>

    </div>
    </div>
    <div className="row" style={{  marginTop: "10px" }}>
    <div className="col-sm-4">
     

    
    <div className="form-group">
      <label>Vehicle Name *</label>
      <input type="name" className="form-control" required value={name} onChange={e => setName(e.target.value)}
        name="name" />
    </div>
    </div>
  
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Regestration Year *</label>
      <input type="number" className="form-control" required value={regYear} onChange={e => setRestrationYear(e.target.value)}
        name="number" />
    </div>
    </div>
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="name">Color *</label>
      <input type="name" className="form-control" required value={Color} onChange={e => setColor(e.target.value)}
        name="name" />
    </div>
    </div>
    </div>
    





    <div className="row" style={{  marginTop: "10px" }}>
 
  
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="name">Manufacturer *</label>
      <input type="name" className="form-control" required value={Manufacture} onChange={e => setManufacture(e.target.value)}
        name="name" />
    </div>
    </div>


    <div className="col-sm-4">
     <div className="form-group">
       <label htmlFor="number">Plate Number *</label>
       <input type="number" className="form-control" required value={PlateNumber} onChange={e => setPlateNumber(e.target.value)}
         name="number" />
     </div>
</div>

     <div className="col-sm-4">
    
     <div className="form-group">
       <label htmlFor="name">Category *</label>
</div>
<div>
       <select style={{width:"100%"}}
          value={selectedTeam}
           
          onChange={e =>{{
          setSelectId(e.target.key)
           setSelectedTeam(
              
               (e.target.value) )
               
           } }}
        >
          {Category.map(cat => (
            <option
              key={cat._id}
              value={cat.name}
             
            >
              {cat.name}
            </option>
          ))}
        </select>

     </div>
    
  
    </div>
</div>



    <div className="row" style={{marginLeft:"48%", marginTop: "10px" }}>
   
    <button type="submit" className="btn btn-primary btn-mg">
      Submit
    </button>
    </div>
    
  
  </form>
 
  </div>
  );
}