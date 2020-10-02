import React, { useState } from 'react';
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


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1.5),
      width: 200,
      
      
    },
  },
}));
export default function UserProfile(props) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_num, set_num] = useState('')
  const [pass, set_pass] = useState('')
  const [values, setValues] = React.useState({
   
    password: '',
    
    showPassword: false,
  });
  const [gender, setGender] = React.useState('');
  const [city, setCity] = React.useState('');
  const [roll, setRoll] = React.useState('');
  
  const handleChange = (event) => {
  
    setGender(event.target.value);
  
  };

  let history = useHistory();
 

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const user = {
      name:name,
      mobile: phone_num,
      password: pass,
      email:email,
      gender:gender,
      accessLevel:roll,
      userType:"president",
      city:city

    };
    axios.post(`http://localhost:8080/api/admin`, user)
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

   <div   style={{ width:"100%" , alignItems:"center" , marginTop:"20px"  }}>

     { <p  style={{textAlign:"center"  }}>Register Admin</p> }
        <form  onSubmit={handleSubmit} >
   
<div className="container-fluid "  style={{ width:"50%" , alignItems:"center" , marginTop:"20px"  , border:"10px" , borderBlock:"10px" ,borderBlockColor:"black" }}>
        
        <div className="row">

         
  
          <TextField className="inputFields"  required id="standard-required" label="Name" value={name} onChange={e => setName(e.target.value)} />

          <TextField className="inputFields"  required id="standard-required" label="Mobile Number" value={phone_num} onChange={e => set_num(e.target.value)} />

          <TextField className="inputFields"  required id="standard-required" label="Email" value={email} onChange={e => setEmail(e.target.value)} />


          <FormControl className="inputFields">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
          value={pass}
           onChange={e => set_pass(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>




      <FormControl className="inputFields">
        <InputLabel id="demo-simple-select-label"> Gender</InputLabel>
        <Select
        placeholder="select gender"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={handleChange}
        >
         
          <MenuItem value={"male"} >Male</MenuItem>
          <MenuItem value={"female"} >Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="inputFields">
        <InputLabel id="demo-simple-select-label"> City</InputLabel>
        <Select
        placeholder="select City"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          onChange={e=>setCity(e.target.value)}
        >
         
          <MenuItem value={"Rawalpindi"} >Rawalpindi</MenuItem>
          <MenuItem value={"Islamabad"} >Islamabad</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="inputFields">
        <InputLabel id="demo-simple-select-label">Roll</InputLabel>
        <Select
        placeholder="select Roll"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roll}
          onChange={e=>setRoll(e.target.value)}
        >
         
          <MenuItem value={"superAdmin"} >Super-Admin</MenuItem>
          <MenuItem value={"manager"} >Manager</MenuItem>
        </Select>
      </FormControl>



          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />


          <div className="form-btn">

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

            >

             Create Admin
            </Button>

          </div>
          
         </div>
        </div>
        </form>
      </div>
   
  );
}