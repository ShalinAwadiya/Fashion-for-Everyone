// Shalin Hasanbhai Awadiya - B00892907
import * as React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../utils/firebase";
import { AUTH_TOKEN_KEY, deleteLocalToken } from "../../utils/firebase";
import AXIOS_CLIENT from "../../utils/apiClient";

export default function ComplainForm() {
  const navigate = useNavigate();
  console.log(localStorage.getItem(AUTH_TOKEN_KEY));
  const [complainSubject, setComplainSubject] = useState("");
  const [complainDescription, setComplainDescription] = useState("");
  const [complainAttachment, setComplainAttachment] = useState("");

  const [complainSubjectError, setComplainSubjectError] = useState("");
  const [complainDescriptionError, setComplainDescriptionError] = useState("");

  const complainSubjectHandler = (event) => {
    setComplainSubject(event.target.value);

    if (event.target.value === "") {
      setComplainSubjectError("Complain Subject cannot be empty");
    } else {
      setComplainSubjectError("");
    }
  };
  const complainDescriptionHandler = (event) => {
    setComplainDescription(event.target.value);

    if (event.target.value === "") {
      setComplainDescriptionError("Complain Description cannot be empty");
    } else {
      setComplainDescriptionError("");
    }
  };
  const complainAttachmentHandler = (event) => {
    setComplainAttachment(event.target.value);
  };

  const submitButtonHandler = async (event) => {
    event.preventDefault();
    let complainSubjectCheck = true;
    let complainDescriptionCheck = true;
    console.log(complainSubject, complainDescription, complainAttachment);
    if (complainSubject === "") {
      complainSubjectCheck = false;
      setComplainSubjectError("Complain Subject cannot be empty");
    }
    if (complainDescription === "") {
      complainDescriptionCheck = false;
      setComplainDescriptionError("Complain Description cannot be empty");
    }
    if (complainSubjectCheck === true && complainDescriptionCheck === true) {
      const uuid = uuidv4();

      var today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let complainDetails = {
        complainId: uuid,
        complainSubject: complainSubject,
        complainDescription: complainDescription,
        complainDate: date,
        complainTime: time,
        complainStatus: "Pending",
        complainImage: "base64",
        complainFrom_LoginId: auth.currentUser.uid,
      };
      /*
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem(AUTH_TOKEN_KEY),
        },
        body: JSON.stringify(complainDetails),
      };
      const response = await fetch(
        "http://localhost:8080/complains/user/insertComplain",
        requestOptions
      );
      */
      const response = await AXIOS_CLIENT.post(
        "/complains/user/insertComplain",
        complainDetails
      );
      console.log(date, time, uuid, response.data);
      navigate("/view_complain");
    }
  };

  const viewComplainHandler = (event) => {
    navigate("/view_complain");
  };

  return (
    <Box
      border={2}
      borderColor="rgb(26,125,230)"
      height={650}
      width={500}
      padding="20px"
      margin="auto"
      marginTop="100px"
      display="flex"
    >
      <form>
        <h2>Post Complain</h2>
        <TextField
          required
          multiline
          id="name-input"
          name="name"
          label="Complain Subject"
          type="text"
          style={{ width: "350px" }}
          onChange={complainSubjectHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {complainSubjectError}
        </span>
        <br />
        <br />
        <TextField
          required
          multiline
          rows={4}
          id="name-input"
          name="name"
          label="Complain Description"
          type="text"
          style={{ width: "350px" }}
          onChange={complainDescriptionHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {complainDescriptionError}
        </span>
        {/*
        <br />
        <br />
        <label>
          Complain Attachment(if any)
          <br />
          <br />
          <input
            type="file"
            id="file"
            name="file"
            onChange={complainAttachmentHandler}
          />
        </label>
  */}
        <br />
        <br />
        <br />
        <Button onClick={submitButtonHandler} variant="contained">
          Submit
        </Button>
        &nbsp;
        <Button variant="contained">Cancel</Button>
        <br />
        <br />
        <br />
        <Button
          style={{ width: "200px" }}
          onClick={viewComplainHandler}
          variant="outlined"
        >
          View Complains
        </Button>
      </form>
    </Box>
  );
}
