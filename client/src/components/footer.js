//Author: Manan Amin (B00897712)

import { Container, Grid, Box, Link, Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getUserId } from "../utils/firebase";
import AXIOS_CLIENT from "../utils/apiClient";

function Footer() {
  const [role, setRole] = useState();
  const getUser = async () => {
    const temp = getUserId();
    console.log(temp);

    const response = await AXIOS_CLIENT.get("/users");
    console.log("Response:", response.data);
    setRole(response.data.role);
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box px={{ xs: 3, sm: 8 }} py={{ xs: 3, sm: 8 }} className="mt-5 bg-light">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}>Get to Know Us</Box>
            <Box>
              <Link href="/" color="inherit">
                {" "}
                About Company
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                {" "}
                Culture
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}> Make Money with Us </Box>
            <Box>
              <Link href="/" color="inherit">
                {" "}
                sell on Fashion World
              </Link>
            </Box>
            <Box>
              {console.log("Role", role)}
              {role == 0 ? (
                <Link href="/wishlist" color="inherit">
                  {" "}
                  Wishlist
                </Link>
              ) : null}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}>Help </Box>
            <Box>
              {console.log("Role", role)}
              {role == 0 ? (
                <Link href="/post_complain" color="inherit">
                  {" "}
                  Complain
                </Link>
              ) : role == 1 ? (
                <Link href="/admin/view_complain" color="inherit">
                  {" "}
                  Complain
                </Link>
              ) : null}
            </Box>
            <Box>
              <Link href="/" color="inherit">
                {" "}
                Manage your Account
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
