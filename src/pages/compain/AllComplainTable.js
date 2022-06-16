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
import admindata from "../../data/admindata.json";
import { useNavigate } from "react-router-dom";
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

export default function AllComplainTable() {
  const classes = useStyles();
  const navigate = useNavigate();
  let complains = admindata;
  const replyButtonHandler = () => {
    navigate("/admin/reply_complain");
  };
  return (
    <Box margin="auto" marginTop="50px" marginLeft="175px" display="flex">
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
                  Username
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
                <TableCell>{complain.complainUsername}</TableCell>
                <TableCell>
                  <Typography
                    className={classes.status + " " + "rounded"}
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
                  <Grid container>
                    <Grid item sm={5}>
                      <button
                        disabled={complain.complainStatus === "Replied"}
                        type="button"
                        className="btn btn-primary"
                        onClick={replyButtonHandler}
                      >
                        Reply
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
