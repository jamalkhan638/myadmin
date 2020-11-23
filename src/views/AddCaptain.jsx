import React, { useState, useEffect } from 'react';
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
import "../assets/css/header.css"
import { BorderAllRounded } from '@material-ui/icons';
import Avatar from 'react-avatar-edit'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: 200,


    },
  },
}));
export default function AddCaptain(props) {
 
  const classes = useStyles();
  const [vehiclename, setVehicleName] = useState('')
  const [regYear, setRegYear] = useState('')
  const [manufacture, setManufacture] = useState('')
  const [platNum, setPlatNum] = useState('')
  const [category, setCategory] = useState('')
  
  // const [captainName, setCaptainName] = useState('')
  const [mob, setMob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [city, setCity] = useState('')
  const [vehicle, setvehicle] = useState('')
  


  let history = useHistory();

  let id=undefined
  let value=undefined
  useEffect(() => {
    // if (props.match.params.id != undefined) {
    //   console.log(props.match.params.id)
    //    value = props.match.params.id
    //   id = value.replace(":", "")
    //   axios.get(

    //     `http://localhost:8080/api/category/${id}`,
    //     { headers }

    //   )
    //     .then(response => {
    //       console.log(response)
    //       setName(response.data.name)
    //       setTtl(response.data.ttl)
    //       set_ChargesBase(response.data.charges.base)
    //       set_charges_perKm(response.data.charges.perKm)
    //       set_charges_waitingOnLoading(response.data.charges.waitingOnLoading)
    //       set_ChargesCongestion(response.data.charges.waiting)
    //       set_charges_waitingOnUnloading(response.data.charges.waitingOnUnloading)
    //       set_loadingMins(response.data.loadingMins)
    //       set_unloadingMins(response.data.unloadingMins)
    //       set_earning_driver(response.data.earning.driver)
    //       set_earning_company(response.data.earning.company)
    //       set_cancellation_time(response.data.cancellation.time)
    //       set_cancellation_count(response.data.cancellation.count)



    //     })
    // }
  }
    , []);

  //  function onClose() {
  //   set_preview({ preview: null });
  // }
      
  //    const onCrop=(preview)=> {
  //       set_preview({preview})
  //     }
  let token = localStorage.getItem('x-access-token');

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }
  const handleCancel = (evt) => {
    history.push('/admin/captain')
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = {
  name: vehiclename,
  year: regYear,
  make: manufacture,
   registration: platNum,
   category: category

    };
    console.log(user)
//     if (props.match.params.id != undefined) {
//       axios.patch(`http://localhost:8080/api/category/${id}`, user, { headers: headers })
//         .then(response => {
//           console.log(response)
//           if (response.data.message) {
// console.log(response.data)
//             alert(response.data.message);

//           }
//           else {
//             console.log(response.data)
//             alert(response.data.message);

//           }


//         })


//     }
   
      axios.post("http://localhost:8080/api/vehicle", user, {headers})
        .then(response => {
          console.log(response)
          if (response.data.message) {

            alert(response.data.message);

          }
          else {

            alert(response.data.message);

          }

        })
    }
  

  return (
    <div className="container-fluid" style={{
      alignContent: "center",
      content: "center",

    }}>


      <div className="row" style={{ margin: "10px" }}>
        <div className="col-sm-12 " style={{ textAlign: "center", backgroundColor: 'gray', color: "white", borderRadius: "5px" }} >
          <h3>Add Captain</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-10">
            <h4>Vehicle details</h4>
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn-secondry btn-sm" style={{ marginTop: "20px" }} onClick={handleCancel}>
              Cancel
    </button>

          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">



            <div className="form-group">
              <label>Vehicle Name *</label>
              <input type="name" value ={vehiclename} className="form-control" onChange={e => setVehicleName(e.target.value)}
                name="name" />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Regestration Year *</label>
              <input  className="form-control" value = {regYear} onChange={e => setRegYear(e.target.value)}
                name="number" />
            </div>
          </div>
          {/* <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Color *</label>
              <input type="name" className="form-control" required value={charges_base} onChange={e => (e.target.value)}
                name="number" />
            </div>
          </div> */}
        </div>






        <div className="row" style={{ marginTop: "10px" }}>


          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="name">Manufacturer *</label>
              <input  className="form-control" value = {manufacture} onChange={e => setManufacture(e.target.value)}
                />
            </div>
          </div>


          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Plate Number *</label>
              <input  className="form-control" required value={platNum} onChange={e => setPlatNum(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-4">

            <div className="form-group">
              <label htmlFor="number">Category *</label>
              <input  className="form-control" required value={category} onChange={e => setCategory(e.target.value)}
                 />
            </div>


          </div>
        </div>

        <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}>

<button type="submit" className="btn btn-primary btn-mg">
  Submit
</button>
</div>

{/* <h4>Captian details</h4>


             
        <div className="row" style={{ marginTop: "30px" }}>


          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Name *</label>
              <input type="number" className="form-control" required value={vehiclename} onChange={e => setVehicleName(e.target.value)}
                name="number" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Mobile Number *</label>
              <input type="number" className="form-control" required value={mob} onChange={e => setMob(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Email *</label>
              <input type="number" className="form-control" required value={email} onChange={e => setEmail(e.target.value)}
                name="number" />
            </div>
          </div>
        </div>





        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-3">



            <div className="form-group">
              <label htmlFor="number">Password *</label>
              <input type="number" className="form-control" required value={password} onChange={e => setPassword(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="number">Gender *</label>
              <input type="number" className="form-control" required value={gender} onChange={e => setGender(e.target.value)}
                name="number" />
            </div>
          </div>


          <div className="col-sm-3">



            <div className="form-group">
              <label htmlFor="number">City *</label>
              <input type="number" className="form-control" required value={city} onChange={e => setCity(e.target.value)}
                name="number" />
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="number">Vehicle *</label>
              <input type="number" className="form-control" required value={vehicle} onChange={e =>setvehicle(e.target.value)}
                name="number" />
            </div>
          </div>

        </div> */}

        <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}>

     
        </div>


      </form>

    </div>
  );
}