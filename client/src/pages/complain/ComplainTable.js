// Shalin Hasanbhai Awadiya - B00892907
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import AXIOS_CLIENT from "../../utils/apiClient";
import { getUserId } from "../../utils/firebase";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

import data from "../../data/data.json";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },

  tableContainer: {
    borderRadius: 15,
    margin: "5px 5px",
    maxWidth: 1000,
    alignContent: "center",
  },

  tableHeaderCell: {
    fontWeight: "bold",
    fontSize: "14.4px",
    fontFamily: "sans-serif",
    align: "center",
    backgroundColor: "rgb(26,125,230)",
    color: "white",
  },
  tableBody: {
    borderBottom: "1px solid #dddddd",
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    border: "1px",
  },
  status: {
    //fontWeight: "bold",
    fontSize: "0.90rem",
    fontFamily: "sans-serif",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 0,
    padding: "1px 2px",
    display: "inline-block",
  },
}));

export default function ComplainTable() {
  const navigate = useNavigate();

  const [complains, setComplains] = useState();
  let temp;
  const getComplains = async () => {
    const temp = getUserId();
    console.log(temp);
    //temp = auth.currentUser.uid;
    /*
    const response = await fetch(
      "http://localhost:8080/complains/user/viewComplains/" + temp
    );
    */
    const response = await AXIOS_CLIENT.get(
      "/complains/user/viewComplains/" + temp
    );

    console.log(response.data.complains);
    setComplains(response.data.complains);
  };
  useEffect(() => {
    getComplains();
  }, []);

  const classes = useStyles();

  const handleDeleteClick = async (complainId) => {
    /*
    var requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(
      "http://localhost:8080/complains/user/deleteComplain/" + complainId,
      requestOptions
    );
    */
    const response = await AXIOS_CLIENT.delete(
      "/complains/user/deleteComplain/" + complainId
    );
    console.log(response.data.message);
    getComplains();
  };
  const handleEditClick = async (complainId) => {
    navigate("/edit_complain/" + complainId);
  };

  return (
    <Box margin="auto" marginTop="50px" marginLeft="150px" display="flex">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Subject
                </Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Description
                </Typography>
              </TableCell>
              {/*
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Attachment
                </Typography>
              </TableCell>
  */}
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Reply
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complains &&
              complains.map((complain) => (
                <TableRow
                  key={complain.complainId}
                  className={classes.tableBody}
                >
                  <TableCell>{complain.complainSubject}</TableCell>
                  <TableCell>{complain.complainDescription}</TableCell>
                  {/*
                  <TableCell>
                    <a href="/" style={{ textDecoration: "none" }}>
                      View
                    </a>
                  </TableCell>
              */}
                  <TableCell>
                    <Typography
                      className={classes.status + " rounded"}
                      style={{
                        backgroundColor:
                          (complain.complainStatus === "Pending" && "green") ||
                          (complain.complainStatus === "Replied" && "red"),
                      }}
                    >
                      {complain.complainStatus}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {complain.complainStatus !== "Pending" ? (
                      <a
                        href={"/replied_complain/" + complain.complainId}
                        style={{ textDecoration: "none" }}
                      >
                        View
                      </a>
                    ) : (
                      <span>View</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item sm={5}>
                        <button
                          type="button"
                          disabled={complain.complainStatus === "Replied"}
                          className="btn btn-primary"
                          onClick={() => handleEditClick(complain.complainId)}
                        >
                          Edit
                        </button>
                      </Grid>
                      &nbsp;&nbsp;
                      <Grid item sm={2}>
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={() => handleDeleteClick(complain.complainId)}
                        >
                          Delete
                        </button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
