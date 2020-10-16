import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Maps from './Maps'
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import React, { useState,useEffect } from 'react';
import axios from 'axios';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
export default function Dashboard(props) {


  const [TotalDriver, setTotalDrivers] = useState('')
  const [OnlineDrivers, setOnlineDrivers] = useState(0)
  const [OfflineDrivers, set_OfflineDrivers] = useState('')
  const [EngagedDrivers, set_EngagedDrivers] = useState('')
  const [BlockedDrivers, set_BlockedDrivers] = useState(0)

 const createLegend =(json)=> {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  let token = localStorage.getItem('x-access-token');

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  }
  useEffect(() => {
   
    axios.get(

      `http://localhost:8080/api/driver/count-stats`,
      { headers }

    )
      .then(response => {
      console.log(response)
      setTotalDrivers(response.data.totalDrivers)
      setOnlineDrivers(response.data.onlineDrivers)
      set_OfflineDrivers(response.data.offlineDrivers)
      set_EngagedDrivers(response.data.engagedDrivers)
      set_BlockedDrivers(response.data.blockedDrivers)

        //  setTotalDrivers(response.data.count)
        //  if(response.data.data.length)
        //  { 
          
        //    for(let i=0;i<response.data.data.length;i++)
        //    {
           
        //      if(response.data.data.socket==null)
        //      {
              
        //            setOnlineDrivers(OnlineDrivers+1)

        //      }
        //      if(response.data.data.isBlocked==true)
        //      {
              
        //       set_BlockedDrivers(BlockedDrivers+1)

        //      }
        //    }
        //  }
        //  set_OfflineDrivers(TotalDriver-OnlineDrivers)



      })


  }
    , []);




    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-note2 text-warning" />}
                statsText="Reg Drivers"
                statsValue={TotalDriver}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Online Drivers"
                statsValue={OnlineDrivers}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Offline Drivers"
                statsValue={OfflineDrivers}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Engaged Drivers"
                statsValue={EngagedDrivers}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fa pe-7s-less text-info" />}
                statsText="Blocked Drivers"
                statsValue={BlockedDrivers}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title={"Driver Found: "+OnlineDrivers}
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                
                content={
                 
                   <Maps />
                
               }
                legend={
                  <div className="legend">{createLegend(legendSales)}</div>
                }
              />
            </Col>
            {/* <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col> */}
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
              }

