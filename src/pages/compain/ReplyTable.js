import * as React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import data from "../../data/replydata.json";
import { Box } from "@mui/material";

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
  let complains = data;

  return (
    <Box margin="auto" marginTop="125px" marginLeft="175px" display="flex">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Reply Subject
                </Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Reply Message
                </Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Reply Date
                </Typography>
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                <Typography color="white" variant="h6">
                  Reply Time
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complains.map((complain) => (
              <TableRow key={complain.complainId} className={classes.tableBody}>
                <TableCell>{complain.replySubject}</TableCell>
                <TableCell>{complain.replyMessage}</TableCell>
                <TableCell>{complain.replyDate}</TableCell>
                <TableCell>{complain.replyTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
