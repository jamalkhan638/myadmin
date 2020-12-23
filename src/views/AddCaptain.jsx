import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import "../components/loginForn/Login.css";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "../assets/css/header.css";
import { BorderAllRounded } from "@material-ui/icons";
import Avatar from "react-avatar-edit";
import AvatarEditor from 'react-avatar-editor'
import AddVehicles from './AddVehicles';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1.5),
      width: 200,
    },
  },
}));
export default function AddCaptain(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gender, setGender] = useState();
  const [mobile, setMobile] = useState();
  const [city, setCity] = useState();
  const [picture, setPicture] = useState(null);
  const [document1, setDocument1] = useState(null);
  const [document2, setDocument2] = useState(null);
  const [document3, setDocument3] = useState(null);
  const [document4, setDocument4] = useState(null);
  const [document5, setDocument5] = useState(null);
  const [imgData, setImgData] = useState();
  const [imgData1, setImgData1] = useState();
  const [imgData2, setImgData2] = useState();
  const [imgData3, setImgData3] = useState();
  const [imgData4, setImgData4] = useState();
  const [imgData5, setImgData5] = useState();
  const [selecetedfile, setselectedfile] =useState()
  const [vname, setVName] = useState('')
  const [regYear, setRestrationYear] = useState('')
  const [Color, setColor] = useState('')
  const [Manufacture, setManufacture] = useState('')
  const [PlateNumber, setPlateNumber] = useState('')
  const [category, setCategory] = useState([])
  const[selectedTeam,setSelectedTeam]=useState("Select Category")
  const [selectId,setSelectId]=useState('')
  const[selectedVTeam,setSelectedVTeam]=useState("Select Vehicle")
  const [selectVId,setSelectVId]=useState('')
  const [vehicle,setVehicle]= useState()
  const maxNumber = 69;
  let history = useHistory();

  const onChangePicture = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const onChangePicture1 = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setDocument1(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData1(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const onChangePicture2 = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setDocument2(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData2(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangePicture3 = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setDocument3(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData3(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangePicture4 = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setDocument4(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData4(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const onChangePicture5 = e => {
    console.log("picture: ", e.target.files);
    if (e.target.files[0]) {
      
      // console.log("picture: ", e.target.files);
      setDocument5(e.target.files[0]);
      const reader = new FileReader();
      console.log(reader)
      reader.addEventListener("load", () => {
        setImgData5(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };











 
  let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  



 useEffect(() => {
    
   
    axios.get(

      `http://localhost:8080/api/category/`,
      { headers }

    )
      .then(response => {
     
  setCategory(response.data.data)

      })




      axios.get(

        `http://localhost:8080/api/vehicle/`,
        { headers }
  
      )
        .then(response => {
       
    setVehicle(response.data.data)
  
        })
      
    
  
}
  , []);





  const handleCancel = (evt) => {
    history.push("/admin/captain");
  };
console.log(imgData)
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobile', mobile);
    formData.append('gender', gender);
    formData.append('city', city);
    formData.append('vehicle',selectVId);
    formData.append('avatar', picture);
    formData.append('document1',document1);
    formData.append('document2',document2);
    formData.append('document3',document3)
    formData.append('document4',document4)
    formData.append('document5',document5)

console.log(formData)
// console.log(imgData)
//     const user = {
//       name: name,
//       password: password,
//       gender: gender,
//       mobile: mobile,
//       email: email,
//       city: city,
//       file: picture
//     };
// console.log(user)
    axios
      .post(`http://localhost:8080/api/admin/add-driver`, formData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          notifyAdd1()
          history.push("/admin/captain");
         } else {
           alert("Error");
         }
      });
  };



  const handleSubmit1 = (evt) => {
    evt.preventDefault();




    console.log("165",selectId)
    const user = {
            name:vname,
            year:regYear,
            category:selectId,
            color:Color,
            make:Manufacture,
            registration:PlateNumber,

           
     

    };
    console.log("user",user)






  axios.post(`http://localhost:8080/api/vehicle`, user, { headers: headers })
    .then(response => {
  
     console.log(response)
     if (response.status == 201) {
     notifyAdd()
    } else {
      alert("Error");
    }

    })


  }



  const notifyAdd = ()=>{
    toast.success('Vehicle Add Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const notifyAdd1 = ()=>{
    toast.success('Captain Add Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <div
      className="container-fluid"
      style={{
        alignContent: "center",
        content: "center",
      }}
    >
      <div className="row" style={{ margin: "10px" }}>
        <div
             className="col-sm-12 "
            style={{
            textAlign: "center",
            backgroundColor: "gray",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <h3>Add Vehicle</h3>
        </div>
      </div>
      <form  onSubmit={(evt)=>handleSubmit1(evt)}>

<div className="row" style={{  marginTop: "10px" }}>
<div className="col-sm-10">
<h4>Vehicles details</h4>
</div>
<div className="col-sm-2">
<Button type="submit" variant="contained"size ="medium" style={{marginTop:"20px", backgroundColor: "grey", color: "white"}} onClick={handleCancel}>
   Cancel
</Button>

</div>
</div>
<div className="row" style={{  marginTop: "10px" }}>
<div className="col-sm-4">
 


<div className="form-group">
  <label>Vehicle Name *</label>
  <input type="name" className="form-control" required value={vname} onChange={e => setVName(e.target.value)}
    name="name" />
</div>
</div>

<div className="col-sm-4">
<div className="form-group">
  <label htmlFor="number">Registration Year *</label>
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
   <input  className="form-control" required value={PlateNumber} onChange={e => setPlateNumber(e.target.value)}
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
      let item = category.find(cat=> cat.name === e.target.value)
      console.log("item",item)
      setSelectId((item._id))
   
       setSelectedTeam(
          e.target.value
       )
           
       }}}
 
    >
      {category  && category.map(cat => 
      (

        <option
        
          value={cat.name}
         
        >
            
          {cat.name}
        </option>

      ))
      
      
      }
    </select>

 </div>


</div>
</div>



<div className="row" style={{marginLeft:"48%", marginTop: "10px" }}>

<Button style={{marginTop: 70}} type="submit" variant ="contained" size ="large" color="primary">
            Submit
          </Button>
</div>


</form>
      <form onSubmit={handleSubmit}>
        
        <div className="container-fluid" style={{
      alignContent: "center",
      content:"center",
     
    }}>
   
               
    <div className="row" style={{  margin: "10px" }}>
    <div className="col-sm-12 " style={{textAlign:"center" ,backgroundColor:'gray', color:"white" , borderRadius:"5px"}} >
                  <h3> Add Captain</h3>
                </div>
                </div>
    
                <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-12">
            <h4>Captain details</h4>
          </div>
         
        </div>
 
  </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label> Name * </label>
              <input
                type="name"
                className="form-control"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Email *</label>
              <input
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="number"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Mobile *</label>
              <input
                type="number"
                className="form-control"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                name="number"
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Gender *</label>
              <input
                className="form-control"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                name="number"
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">Password *</label>
              <input
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="number"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">City *</label>
              <input
                className="form-control"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="number"
              />
            </div>
          </div>
          </div>

          <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">

<div className="form-group">
  <label htmlFor="name">Vehicle Plate Number *</label>
</div>
<div>
  <select style={{width:"100%"}}
     value={selectedVTeam}
      
     onChange={e =>{{
     let item = vehicle.find(veh=> veh.registration === e.target.value)
     console.log("item",item)
     setSelectVId((item._id))
  
      setSelectedVTeam(
         e.target.value
      )
          
      }}}

   >
     {vehicle  && vehicle.map(veh => 
     (

       <option
       
         value={veh.registration}
        
       >
           
         {veh.registration}
       </option>

     ))
     
     
     }
   </select>

</div>


</div>




<div className="col-sm-2"> 
<label>Add Picture *</label>
<div  className="register_profile_image">
                <input id="profilePic" type="file"  onChange={(e)=> onChangePicture(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img style={{ backgroundColor: "grey"}}  src ={imgData}    width={100}
        height={100} />
             </div>
            
          </div>


          <div className="col-sm-2" style={{marginLeft: 40}}> 
<label>Add Documennt 1 *</label>
<div className="register_profile_image">
                <input id="profilePic1" type="file"  onChange={(e)=> onChangePicture1(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img style={{ backgroundColor: "grey"}}  src ={imgData1}    width={100}
        height={100} />
             </div>
            
          </div>
          <div className="col-sm-2" style={{marginLeft: 40}}> 
<label>Add Document 2 *</label>
<div className="register_profile_image">
                <input id="profilePic2" type="file"  onChange={(e)=> onChangePicture2(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img style={{ backgroundColor: "grey"}}  src ={imgData2}    width={100}
        height={100} />
             </div>
            
          </div>



</div>
          <div className="row" style={{ marginTop: "10px" }}>
        
        

          <div className="col-sm-3"> 
<label>Add Document 3 *</label>
<div className="register_profile_image">
                <input id="profilePic3" type="file"  onChange={(e)=> onChangePicture3(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img style={{ backgroundColor: "grey"}}  src ={imgData3}    width={100}
        height={100} />
             </div>
            
          </div>
          <div className="col-sm-3"> 
<label>Add Document 4 *</label>
<div className="register_profile_image">
                <input id="profilePic4" type="file"  onChange={(e)=> onChangePicture4(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img  style={{ backgroundColor: "grey"}} src ={imgData4}    width={100}
        height={100} />
             </div>
            
          </div>
          <div className="col-sm-3" > 

<label>Add Document 5*</label>
<div  className="register_profile_image">
                <input id="profilePic5" type="file"  onChange={(e)=> onChangePicture5(e)} />
               
              </div>
             
             <div  className="form-group preview">
             <img style={{ backgroundColor: "grey"}}  src ={imgData5}    width={100}
        height={100} />
             </div>
            
          </div>
          <div className="col-sm-3">

<Button style={{marginTop: 70}} type="submit" variant ="contained" size ="large" color="primary">
  Submit
</Button>



</div>


          </div>

        

      
      </form>
    </div>
  );
}