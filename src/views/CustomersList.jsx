import React, { useState, useEffect } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "reactjs-hooks-pagination";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountTwoToneIcon from "@material-ui/icons/SupervisorAccountTwoTone";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

let query = "false";
const GreenTooltip = withStyles({
  tooltip: {
    fontSize: "1em",
    color: "white",
    backgroundColor: "blue",
  },
})(Tooltip);
const pageLimit = 4;

export default function CustomerList(props) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  // const [searchData, setseacrh] = useState("")
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [activecolor, setactiveColor] = useState();
  const [blockcolor, setblockColor] = useState();

  const [totalRecords, setTotalRecords] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  let token = localStorage.getItem("x-access-token");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "Application/json",
    "x-access-token": token,
  };

  useEffect(() => {
    // console.log(currentPage)
    axios
      .get(`http://localhost:8080/api/customer?isBlocked=${query}`, { headers })
      .then(
        (res) => {
          console.log(res);
          setData(res.data.data);
          setTotalRecords(res.data.count);
          setactiveColor("primary");
        }

        // (error) => {
        //   var status = error.res.status;
        //   console.log(error);
        // }
      );
  }, [currentPage]);

  const handleQuery = (data) => {
    axios
      .get(`http://localhost:8080/api/customer?isBlocked=${data}`, { headers })
      .then((res) => {
        console.log(res);
        setData(res.data.data);

        if (data === "false") {
          setactiveColor("primary");
          setblockColor("");
        } else if (data === "true") {
          setblockColor("primary");
          setactiveColor("");
        }
      });
  };

  const handleChange = (val) => {
    setSearchInput(val);
    axios
      .get(`http://localhost:8080/api/customer/?search=name&q=` + searchInput, {
        headers,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      });
  };

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:8080/api/customer/${id}`, { headers })
      .then((res) => {
        console.log(res);
        console.log(res.data);

        const posts = data.filter((customer) => customer._id !== id);
        setData(posts);
      });
  };

  const handleBlock = (customer) => {
    // const myUrl  = "http://localhost:8080/api/customer/"

    axios
      .patch(
        `http://localhost:8080/api/customer/block/${customer._id}`,
        {},
        { headers }
      )
      .then((res) => {
        console.log(res);

        alert(res.data.message);
      });
  };
  let history = useHistory();

  const handlePush = (userID) => {
    history.push("/admin/editCustomer", { params: userID });
  };

  const renderCustomer = () => {
    return (
      data &&
      data.length > 0 &&
      data.map((customer) => {
        return (
          <tr Key={customer._id}>
            <td>{customer.name}</td>
            <td>{customer.mobile}</td>
            <td>{customer.email}</td>

            <td>{customer.accessLevel}</td>
            <td>{customer.gender}</td>
            <td>{customer.city}</td>
            <td>active</td>
            <td>
              {" "}
              <IconButton>
                <BlockIcon
                  color="primary"
                  onClick={() => handleBlock(customer)}
                />{" "}
              </IconButton>
              <IconButton>
                <DeleteIcon
                  color="primary"
                  onClick={() => handleRemove(customer._id)}
                />
              </IconButton>
              <IconButton>
                <EditIcon
                  color="primary"
                  onClick={() => handlePush(customer._id)}
                />
              </IconButton>
              <GreenTooltip title="Profile" arrow>
                <IconButton>
                  <SupervisorAccountTwoToneIcon
                    color="primary"
                    onClick={() =>
                      history.push("/admin/profile", { params: customer._id })
                    }
                  />
                </IconButton>
              </GreenTooltip>
            </td>
          </tr>
        );
      })
    );
  };

  console.log(data);

  return (
    <div>
      <div className="container-fluid">
        <div className="row" style={{ marginLeft: "10px", marginTop: "10px" }}>
          <div className="col-sm-8">
            <Button
              disabled={false}
              variant="contained"
              size="medium"
              onClick={(e) => handleQuery("false")}
              color={activecolor}
            >
              Active
            </Button>

            <Button
              variant="contained"
              color={blockcolor}
              onClick={(e) => handleQuery("true")}
            >
              Block
            </Button>
          </div>
          <div className="col-sm-4">
            <div>
              <label>Search</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <card grid>
        <table
          className="table table-bordered table-condensed table-responsive table-m8"
          style={{ margin: "20px", width: "95%" }}
        >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th scope="col">Roll</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderCustomer()}</tbody>
        </table>
      </card>
      {/* <div className="d-flex flex-row py-4 justify-content-end">
        <Pagination
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          pageRangeDisplayed={1}
          onChangePage={setCurrentPage}
        />
      </div> */}
    </div>
  );
}
