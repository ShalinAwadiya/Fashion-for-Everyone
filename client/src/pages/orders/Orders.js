import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableBody,
  CardMedia,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AXIOS_CLIENT from "../../utils/apiClient";


function Orders() {

  const [orders, setOrders] = useState([]);
  const handleCancelOrder = async (item, index) => {
    let temp = orders;
    temp[index].is_cancelled = true
    temp[index].is_delivered = true
    await AXIOS_CLIENT.post("/order/update_order",{order_id:temp[index]._id});
      setOrders([...temp])
      order_status(temp[index])
      toast.success("Order #" + item._id.substring(1, 6).toUpperCase() + " has been cancelled successfully!")
    }
  

  const order_status = (order) => {
    if (order.is_delivered && !order.is_cancelled) {
      return "DELIVERED"
    }
    else if (order.is_cancelled & order.is_delivered) {
      return "CANCELED"
    }

    else {
      return "PENDING"
    }


  }

  const order_date = (order) => {
    var date = new Date(order.order_date)
    const day = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    return day
  }


  useState(() => {
    AXIOS_CLIENT.get("/order").then((response) => {
      setOrders(response.data.order);
    }).catch((err) => {
      setOrders([]);
    }
    )
  })


  return (
    <Container maxWidth="md">
      <Typography variant="h3" mt={2}>
        Orders
      </Typography>
      <Divider sx={{ width: "20%" }} />
      <Grid container mt={2}>
        <Grid item xs={12}>
          {orders.map((order, index) => (
            <Card key={order._id} sx={{ mb: 2 }}>
              <CardContent sx={{ p: 0 }}>
                <TableContainer
                  component={Paper}
                  sx={{ boxShadow: "0" }}
                >
                  <Table aria-label="simple table" sx={{ bgcolor: grey[100] }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            border: "0",
                            p: 1,
                            pb: 0,
                            color: grey[700],
                            fontSize: 13,
                          }}
                        >
                          Order Placed
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            p: 1,
                            pb: 0,
                            color: grey[700],
                            fontSize: 13,
                          }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            p: 1,
                            pb: 0,
                            color: grey[700],
                            fontSize: 13,
                          }}
                        ></TableCell>
                        <TableCell
                          sx={{
                            border: "0",
                            p: 1,
                            pb: 0,
                            color: grey[700],
                            fontSize: 13,
                          }}
                        ></TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            border: "0",
                            p: 1,
                            pb: 0,
                            color: grey[700],
                            fontSize: 13,
                          }}
                        >
                          ORDER # {order._id.substring(1, 6).toUpperCase()}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        >
                          {order_date(order)}

                          {/* {new Date(order.order_date).getDate()+"-"+new Date(order.order_date).getMonth()+"-"+new Date(order.order_date).getMonth()} */}
                        </TableCell>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        >
                          {order.total_amount} CAD
                        </TableCell>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        ></TableCell>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        ></TableCell>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        ></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <CardContent>
                <Typography variant="h6">{order_status(order)}</Typography>
                <Grid container>
                  <Grid item xs={9}>
                    {order.products.map((product) => (
                      <Card key={product.id} sx={{ display: "flex", boxShadow: 0 }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 80, ml: 2, margin: 1 }}
                          image={product.imageUrl}
                          alt="Dress Image"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="subtitle1">
                              {product.name}
                            </Typography>
                            <Typography component="div" variant="caption">
                              Quantity : {product.quantity}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Card>
                    ))}
                  </Grid>
                  <Grid item xs={3}>
                    {order.is_delivered === false ? <Box textAlign="right">
                      <Button variant="outlined" color="error" onClick={() => handleCancelOrder(order, index)}>Cancel Order</Button>
                    </Box> : ""}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
}

export default Orders;