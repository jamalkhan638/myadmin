import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Maps from "./Maps";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import { Card } from "components/Card/Card.jsx";
import { useLocation } from "react-router-dom";
import AirportShuttleTwoToneIcon from "@material-ui/icons/AirportShuttleTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";

export default function Profile(props) {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMob] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [ride, setRide] = useState("");
  const [report, setReport] = useState("");

  let token = localStorage.getItem("x-access-token");
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };
  const location = useLocation();
  const myparam = location.state.params;
  console.log(myparam);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customer/${myparam}`, { headers })
      .then((res) => {
        setName(res.data.name);
        setPassword(res.data.password);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setMob(res.data.mobile);
        setCity(res.data.city);

        res.data.isBlocked === true ? setStatus("block") : setStatus("active");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ride/?customer=${myparam}`, { headers })
      .then((res) => {
        console.log(res);
        res.data === "" ? setRide("0") : setRide(res.data.count);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/complaint?customer=${myparam}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        res.data === "" ? setReport("0") : setReport(res.data.count);
      });
  }, []);

  const history = useHistory();

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card
            title="Profile"
            content={
              <div style={{ padding: "60px" }}>
                <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Name:
                </b>
                <p> {name} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Email:</b>
                <p> {email} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Contact No:</b>
                <p> {mobile} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>Gender</b>
                <p>{gender} </p>
                <b style={{ color: "#1273DE", fontSize: 18 }}>City:</b>
                <p> {city} </p>
              </div>
            }
          />
        </Col>
        <Col md={4}>
          <Card
            title="Action"
            content={
              <div>
                <IconButton>
                  <BlockIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                  />{" "}
                </IconButton>
                <IconButton>
                  <AirportShuttleTwoToneIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                    onClick={() =>
                      history.push("/admin/customerRide/", { params: myparam })
                    }
                  />
                </IconButton>
                <IconButton>
                  <AssessmentTwoToneIcon
                    style={{ fontSize: 45, margin: 15 }}
                    color="primary"
                  />
                </IconButton>
              </div>
            }
          />
          <Card
            title="Statistic"
            content={
              <div style={{}}>
                <b
                  style={{
                    color: "#1273DE",
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Status:
                </b>
                <p> {status} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Total Rides:</b>
                <p> {ride} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Reports:</b>
                <p> {report} </p>
                <b style={{ color: "#1273DE", fontSize: 15 }}>Credit:</b>
                <p>{} </p>
              </div>
            }
          />
        </Col>
        <Col>
          <Button
            disabled={false}
            variant="contained"
            size="large"
            style={{ marginTop: "20px", backgroundColor: "gray" }}
            // onClick={() => {
            //   history.push("/admin/customer");
            // }}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </div>
  );
}
