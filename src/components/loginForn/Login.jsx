import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import '../loginForn/Login.css'
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
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2.5),
      width: 300,
      
      
    },
  },
}));
export default function SignInSide(props) {
  const classes = useStyles();
  const [phone_num, set_num] = useState('')
  const [pass, set_pass] = useState('')
  const [values, setValues] = React.useState({
   
    password: '',
    
    showPassword: false,
  });
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
      mobile: phone_num,
      password: pass
    };
    axios.post(`http://localhost:8080/api/authenticate/admin`, user)
      .then(response => {

        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("x-access-token",(response.data.token));
          localStorage.setItem("image_url", JSON.stringify(response.data.image_url));
          localStorage.setItem("redisName", JSON.stringify(response.data.redisName));
          history.push('/admin/dashboard')
          window.location.reload();
        }
else{
        console.log(response.data)
        alert(response.data.message);
}
      })

  }

  return (

    <div className="container">
      <div className="wrap">
        <form  onSubmit={handleSubmit} >
   

          <div className="form-title">
            Welcome
					</div>
  
          <TextField className="inputFields"  required id="standard-required" label="Mobile Number" value={phone_num} onChange={e => set_num(e.target.value)} />

     

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

              Sign In
            </Button>

          </div>

        </form>
      </div>
    </div>
  );
}