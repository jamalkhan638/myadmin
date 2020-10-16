import React, { useState, useEffect } from 'react';
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import BlockIcon from '@material-ui/icons/Block';
import Pagination from "react-js-pagination";
import { FormatAlignCenter } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
let query= "null"

const useStyles = makeStyles((theme) => ({



  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(30, 20, 20),
  },
}));
export default function ShowDriver(props){

  const classes = useStyles();
  
    const[open,setOpen] =useState()
    const[data,setData] =useState()


    let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

    useEffect(() => {
        // console.log(currentPage)
        axios
          .get(`http://localhost:8080/api/driver?socket=${query}`, { headers })
          .then(
            (res) => {
              console.log(res);
              setData(res.data.data);
            //   setTotalRecords(res.data.count);
            //   setactiveColor("primary");
            }
    
           
          );
      }, []);





      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <div>
          <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
 
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
        </div>
    )



}