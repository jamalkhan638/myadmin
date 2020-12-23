import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditCaptain(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMob] = useState("");
  const [city, setCity] = useState("");
  const[selectedVTeam,setSelectedVTeam]=useState("Select Vehicle")
  const [selectVId,setSelectVId]=useState('')
  const [vehicle,setVehicle]= useState()
  const[vehi,setVehi] =useState()
  const [imgData, setImgData] = useState();
  const [picture, setPicture] = useState(null);
const [pic, setPic]=useState()
  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

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



  useEffect(() => {
    
   
   




      axios.get(

        `http://localhost:8080/api/vehicle/`,
        { headers }
  
      )
        .then(response => {
       
    setVehicle(response.data.data)
  
        })
      
    
  
}
  , []);





const value = props.match.params.id
const str = value.replace(":","")
console.log(str)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/driver/${str}`, { headers })
      .then((res) => {
          console.log(res)
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setMob(res.data.mobile);
        setCity(res.data.city);
        setImgData(res.data.avatar)
        setPic(res.data.avatar)
        setSelectVId(res.data.vehicle)
      });
  }, []);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const obj = {
    //   name:name,
    //   password,
    //   email,
    //   gender,
    //   mobile,
    //   city
    // };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('mobile', mobile);
    formData.append('gender', gender);
    formData.append('city', city);
    formData.append('vehicle',selectVId);
    formData.append('avatar', picture);


    axios
      .patch(`http://localhost:8080/api/admin/update-driver/${str}`, formData, {
        headers,
      })
      .then((res) => {
        console.log(res)
        if (res.status == 201) {
          history.push("/admin/captain");
        } else {
          alert("Error");
        }
      });
  };

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
          <h3>Edit Captain</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-10">
            <h4>Captain Details</h4>
          </div>
          <div className="col-sm-2">
            <Button
              disabled={false}
              variant="contained"
              size="large"
              style={{ marginTop: "20px", backgroundColor: "gray", color: "white"}}
              onClick={() => {
                history.push("/admin/captain");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label>Name </label>
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
              <label htmlFor="number">Password</label>
              <input
                type="password"
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
              <label htmlFor="number">Email</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="number"
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col-sm-4">
            <div className="form-group">
              <label>City</label>
              <input
                type="name"
                className="form-control"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                name="number"
              />
            </div>  
          </div>

          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="number">gender</label>
              <input
                type="gender"
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
              <label htmlFor="number">Mob</label>
              <input
                type="number"
                className="form-control"
                required
                value={mobile}
                onChange={(e) => setMob(e.target.value)}
                name="number"
              />
            </div>
          </div>


          <div className="col-sm-4">
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

<div className="col-sm-4"> 
<label>Add Picture *</label>

                <input id="profilePic" type="file"  onChange={(e)=> onChangePicture(e)} />
               
        
             
            
               {picture ===null ?  <img    src = {`https://malta-images.s3.amazonaws.com/${imgData}` }   width={200}
        height={150} /> 
      :
      <img    src = {imgData}   width={200}
        height={150} />
      }
            
        
           
            
          </div>


        </div>

        <div className="row" style={{ marginLeft: "48%", marginTop: "10px" }}>
          <Button
           type ="submit"
            disabled={false}
            color="primary"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

// {id}
//
