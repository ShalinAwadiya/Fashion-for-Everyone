import * as React from "react";
import { useState } from "react";
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
  const classes = useStyles();

  const [complains, setComplains] = useState(data);

  const handleDeleteClick = (complainId) => {
    console.log("hello");
    const newComplains = [...complains];

    const index = complains.findIndex(
      (complain) => complain.complainId === complainId
    );

    newComplains.splice(index, 1);
    setComplains(newComplains);
  };

  return (
    <Box margin="auto" marginTop="100px" marginLeft="150px" display="flex">
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
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Attachment
                </Typography>
              </TableCell>
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
            {complains.map((complain) => (
              <TableRow key={complain.complainId} className={classes.tableBody}>
                <TableCell>{complain.complainSubject}</TableCell>
                <TableCell>{complain.complainDescription}</TableCell>
                <TableCell>
                  <a href="/" style={{ textDecoration: "none" }}>
                    View
                  </a>
                </TableCell>
                <TableCell>
                  <Typography
                    className={classes.status}
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
                      href="/replied_complain"
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
                      <button style={{ width: "60px" }} type="button">
                        Edit
                      </button>
                    </Grid>
                    &nbsp;&nbsp;
                    <Grid item sm={2}>
                      <button
                        style={{ width: "60px" }}
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
