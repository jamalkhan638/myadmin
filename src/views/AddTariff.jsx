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
import { BorderAllRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: 200,
      
      
    },
  },
}));
export default function AddTariff(props) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [ttl, setTtl] = useState('')
  const [charges_base, set_ChargesBase] = useState('')
  const [charges_perKm, set_charges_perKm] = useState('')
  const [charges_waiting, set_charges_waiting] = useState('')
  const [charges_waitingOnLoading, set_charges_waitingOnLoading] = useState('')
  const [charges_congestion, set_ChargesCongestion] = useState('')
  const [charges_waitingOnUnloading, set_charges_waitingOnUnloading] = useState('')
  const [loadingMins, set_loadingMins] = useState('')
  const [unloadingMins, set_unloadingMins] = useState('')
  const [earning_driver, set_earning_driver] = useState('')
  const [earning_company, set_earning_company] = useState('')
  const [cancellation_time, set_cancellation_time] = useState('')
  const [cancellation_count, set_cancellation_count] = useState('')


  let history = useHistory();
 

  useEffect(() => {
    

  console.log(props)
    
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
    const user = {
      name:name,
   //   mobile: charges.base,
    //  password: pass,
      ttl:ttl,
      charges:{
        base:charges_base,
        perKm:charges_perKm,
        waiting:charges_congestion,
        waitingOnLoading:charges_waitingOnLoading,
        waitingOnUnloading:charges_waitingOnUnloading

      },
      loadingMins:loadingMins,
      unloadingMins:unloadingMins,

      earning:{
        driver:earning_driver,
        company:earning_company,
      },
      cancellation:{
        time:cancellation_time,
        count:cancellation_count,
      }
      
      

    };
    axios.post(`http://localhost:8080/api/category`, user,{headers:headers})
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
        // if (response.data.token) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        //   localStorage.setItem("x-access-token",(response.data.token));
        //   localStorage.setItem("image_url", JSON.stringify(response.data.image_url));
        //   localStorage.setItem("redisName", JSON.stringify(response.data.redisName));
        //   history.push('/admin/dashboard')
        //   window.location.reload();
        // }
// else{
//         console.log(response.data)
//         alert(response.data.message);
// }
      })

  }

  return (
    <div className="container-fluid" style={{
      alignContent: "center",
      content:"center",
     
    }}>
   
               
    <div className="row" style={{  margin: "10px" }}>
    <div className="col-sm-12 " style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , borderRadius:"5px"}} >
                  <h3>Add New Tariff</h3>
                </div>
                </div>
    
    <form  onSubmit={handleSubmit}>

    <div className="row" style={{  marginTop: "10px" }}>
    <div className="col-sm-10">
    <h4>Kindly Enter Profile Information</h4>
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
      <label>Category Name *</label>
      <input type="name" className="form-control" required value={name} onChange={e => setName(e.target.value)}
        name="name" />
    </div>
    </div>
  
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Acceptance TTL in seconds *</label>
      <input type="number" className="form-control" required value={ttl} onChange={e => setTtl(e.target.value)}
        name="number" />
    </div>
    </div>
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Charges Base in PKR *</label>
      <input type="number" className="form-control" required value={charges_base} onChange={e => set_ChargesBase(e.target.value)}
        name="number" />
    </div>
    </div>
    </div>
    





    <div className="row" style={{  marginTop: "10px" }}>
 
  
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Charges Per KM *</label>
      <input type="number" className="form-control" required value={charges_perKm} onChange={e => set_charges_perKm(e.target.value)}
        name="number" />
    </div>
    </div>


    <div className="col-sm-4">
     <div className="form-group">
       <label htmlFor="number">Charges Loading Per Min *</label>
       <input type="number" className="form-control" required value={charges_waitingOnLoading} onChange={e => set_charges_waitingOnLoading(e.target.value)}
         name="number" />
     </div>
</div>

     <div className="col-sm-4">
    
     <div className="form-group">
       <label htmlFor="number">Charges Unloading Per Min *</label>
       <input type="number" className="form-control" required value={charges_waitingOnUnloading} onChange={e => set_charges_waitingOnUnloading(e.target.value)}
         name="number" />
     </div>
    
  
    </div>
</div>

    <div className="row" style={{  marginTop: "10px" }}>
    
     
    <div className="col-sm-4">
     <div className="form-group">
       <label htmlFor="number">Charges Congestion *</label>
       <input type="number" className="form-control" required value={charges_congestion} onChange={e => set_ChargesCongestion(e.target.value)}
         name="number" />
     </div>
     </div>
     <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Loading Grace Mins *</label>
      <input type="number" className="form-control" required value={loadingMins} onChange={e => set_loadingMins(e.target.value)}
        name="number" />
    </div>
    </div>
 
    <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="number">Unloading Grace Mins *</label>
      <input type="number" className="form-control" required value={unloadingMins} onChange={e => set_unloadingMins(e.target.value)}
        name="number" />
    </div>
    </div>
    </div>

    



    <div className="row" style={{  marginTop: "10px" }}>
    <div className="col-sm-3">
     

    
     <div className="form-group">
       <label htmlFor="number">Driver Earning % *</label>
       <input type="number" className="form-control" required value={earning_driver} onChange={e => set_earning_driver(e.target.value)}
         name="number" />
     </div>
     </div>

    <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="number">Company Earning % *</label>
      <input type="number" className="form-control" required value={earning_company} onChange={e => set_earning_company(e.target.value)}
        name="number" />
    </div>
    </div>
  

    <div className="col-sm-3">
     

    
    <div className="form-group">
      <label htmlFor="number">Cancellations Allowed *</label>
      <input type="number" className="form-control" required value={cancellation_count} onChange={e => set_cancellation_count(e.target.value)}
        name="number" />
    </div>
    </div>
  
    <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="number">Cancellation Grace Mins *</label>
      <input type="number" className="form-control" required value={cancellation_time} onChange={e => set_cancellation_time(e.target.value)}
        name="number" />
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