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
import DressOne from '../../assets/images/dress1.png'
import DressTwo from '../../assets/images/dress2.png'
import DressThree from '../../assets/images/dress3.png'

function Orders() {
  const ordersJSON = {
    orders: [
      {
        orderId: "12",
        products: [
          {
            id: 1,
            title: "Louis Vuitton Mini Dress",
            size: "M",
            price: "700",
            img: DressOne,
            quantity: 1,
          },
          {
            id: 2,
            title: "Blue Party Dress",
            size: "M",
            price: "50",
            img: DressTwo,
            quantity: 1,
          },
        ],
        orderDate: "22-May-2022",
        price: "223",
        status: "Delivered",
      },
      {
        orderId: "657",
        products: [
          {
            id: 2,
            title: "Blue Party Dress",
            size: "M",
            price: "50",
            img: DressTwo,
            quantity: 1,
          },
          {
            id: 3,
            title: "Polka Dot Frock",
            size: "M",
            price: "300",
            img: DressThree,
            quantity: 1,
          }
        ],
        orderDate: "05-May-2022",
        price: "123",
        status: "Pending",
      },
    ],
  };

  const [orders,setOrders]=useState([]);

  const handleCancelOrder = (item,index) =>{
    let temp=orders;

    if(temp[index]===item){
      temp[index].status="Cancelled"
      toast.success("Order #"+item.orderId+" has been cancelled successfully!")
    }

    setOrders([...temp])
  }

  useState(()=>{
    setOrders(ordersJSON.orders);
  })

  return (
    <Container maxWidth="md">
      <Typography variant="h3" mt={2}>
        Orders
      </Typography>
      <Divider sx={{ width: "20%" }} />
      <Grid container mt={2}>
        <Grid item xs={12}>
          {orders.map((order,index) => (
            <Card key={order.orderId} sx={{ mb: 2 }}>
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
                          ORDER # {order.orderId}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        >
                          {order.orderDate}
                        </TableCell>
                        <TableCell
                          sx={{ p: 1, pt: 0, color: grey[700], fontSize: 14 }}
                        >
                          {order.price} CAD
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
                <Typography variant="h6">{order.status}</Typography>
                <Grid container>
                  <Grid item xs={9}>
                    {order.products.map((product) => (
                      <Card key={product.id} sx={{ display: "flex",boxShadow:0}}>
                        <CardMedia
                          component="img"
                          sx={{ width: 80, ml: 2 }}
                          image={product.img}
                          alt="Dress Image"
                        />
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Typography component="div" variant="subtitle1">
                              {product.title}
                            </Typography>
                            <Typography component="div" variant="caption">
                              Quantity : {product.quantity}                               
                            </Typography>
                            <Typography component="div" variant="caption">
                              Size : {product.size}
                            </Typography>                            
                          </CardContent>
                        </Box>
                      </Card>
                    ))}
                  </Grid>
                  <Grid item xs={3}>
                    {order.status==="Pending"?<Box textAlign="right">
                      <Button variant="outlined" color="error" onClick={()=>handleCancelOrder(order,index)}>Cancel Order</Button>
                    </Box>:""}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
      <ToastContainer/>
    </Container>
  );
}

export default Orders;
