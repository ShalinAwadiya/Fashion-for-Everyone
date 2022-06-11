import React, { useState } from "react";
import { Formik, useFormik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import "./App.css";

const ProfileRegisteration = () => {
  // const [toNext, setToNext] = useState(false)
  let navigate = useNavigate();
  const validate = (values) => {
    let errors = {};
    if (values.firstname) {
      if (!/^[A-Za-z]+$/i.test(values.firstname)) {
        errors.firstname = "Invalid First Name";
      }
    }
    if (values.lastname) {
      if (!/^[a-zA-Z]+$/i.test(values.lastname)) {
        errors.lastname = "Invalid Last Name";
      }
    }
    if (values.email) {
      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i.test(values.email)) {
        errors.email = "Invalid email";
      }
    }
    if (values.password) {
      if (!/^[ A-Za-z0-9_@./#,:;&+-]{7,}$/i.test(values.password)) {
        errors.password = "Invalid password";
      }
    }
    if (values.confirmp) {
      if (values.confirmp !== values.password) {
        errors.confirmp = "Password doesn't match";
      }
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmp: "",
      }}
      onSubmit={(e) => navigate("/profile")}
      validate={validate}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            className="formCardStyle"
          >
            <Grid
              direction="column"
              justifyContent="center"
              alignItems="center"
              md={3}
              lg={3}
              xs={10}
              sx={{
                mt: 10,
                mb: 30,
                backgroundColor: "background.paper",
                border: 1,
                borderRadius: 2,
              }}
            >
                <Typography variant="h4" align="center" sx={{mt:2}}>
                    Registration
                </Typography>
              <Grid item sx={{ m: 2 }}>
                <TextField  
                  label="FirstName"
                  variant="outlined"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                />
                <div>
                  {" "}
                  {formik.touched && formik.errors.firstname && (
                    <span style={{ color: "red" }}>
                      {formik.errors.firstname}{" "}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item lg={12} sx={{ m: 2 }}>
                <TextField
                 
                  label="LastName"
                  variant="outlined"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                />
                <div>
                  {" "}
                  {formik.touched && formik.errors.lastname && (
                    <span style={{ color: "red" }}>
                      {formik.errors.lastname}{" "}
                    </span>
                  )}
                </div>
              </Grid>

              <Grid item sx={{ m: 2 }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                />
                <div>
                  {" "}
                  {formik.touched && formik.errors.email && (
                    <span style={{ color: "red" }}>{formik.errors.email} </span>
                  )}
                </div>
              </Grid>
              <Grid item sx={{ m: 2 }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                />
                <div>
                  {" "}
                  {formik.touched && formik.errors.password && (
                    <span style={{ color: "red" }}>
                      {formik.errors.password}{" "}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item sx={{ m: 2 }}>
                <TextField

                  label="Confirm Password"
                  variant="outlined"
                  name="confirmp"
                  type="password"
                  value={formik.values.confirmp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  required
                />
                <div>
                  {" "}
                  {formik.touched && formik.errors.confirmp && (
                    <span style={{ color: "red" }}>
                      {formik.errors.confirmp}{" "}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item sx={{m:2}}>
                <Button variant="contained" type="submit" fullWidth={true}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ProfileRegisteration;
