// Author: Deep Adeshra (dp974154@dal.ca)
import { Grid } from "@mui/material"
import NavBar from "./navbar/Navbar"

function Header(props) {
  return (
      <Grid item xs={12} sx={{ display: 'flex' }}>
        <NavBar />
      </Grid>
    )
}

export default Header;