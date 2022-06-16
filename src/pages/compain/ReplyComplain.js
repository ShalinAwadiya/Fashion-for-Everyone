import * as React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReplyComplain() {
  const navigate = useNavigate();

  const [complainSubject, setComplainSubject] = useState("");
  const [complainDescription, setComplainDescription] = useState("");

  const [complainSubjectError, setComplainSubjectError] = useState("");
  const [complainDescriptionError, setComplainDescriptionError] = useState("");

  const complainSubjectHandler = (event) => {
    setComplainSubject(event.target.value);

    if (event.target.value === "") {
      setComplainSubjectError("Reply Subject cannot be empty");
    } else {
      setComplainSubjectError("");
    }
  };
  const complainDescriptionHandler = (event) => {
    setComplainDescription(event.target.value);

    if (event.target.value === "") {
      setComplainDescriptionError("Reply Message cannot be empty");
    } else {
      setComplainDescriptionError("");
    }
  };

  const submitButtonHandler = (event) => {
    event.preventDefault();
    let complainSubjectCheck = true;
    let complainDescriptionCheck = true;
    console.log(complainSubject, complainDescription);
    if (complainSubject === "") {
      complainSubjectCheck = false;
      setComplainSubjectError("Reply Subject cannot be empty");
    }
    if (complainDescription === "") {
      complainDescriptionCheck = false;
      setComplainDescriptionError("Reply Message cannot be empty");
    }
    if (complainSubjectCheck === true && complainDescriptionCheck === true) {
      navigate("/");
    }
  };

  return (
    <Box
      border={2}
      borderColor="rgb(26,125,230)"
      height={400}
      width={500}
      padding="20px"
      margin="auto"
      marginTop="100px"
      display="flex"
    >
      <form>
        <h2>Complain Reply</h2>
        <TextField
          required
          multiline
          id="name-input"
          name="name"
          label="Reply Subject"
          type="text"
          style={{ width: "350px" }}
          width="300"
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
          style={{ width: "350px" }}
          label="Reply Message"
          type="text"
          onChange={complainDescriptionHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {complainDescriptionError}
        </span>
        <br />
        <br />
        <br />
        <Button onClick={submitButtonHandler} variant="contained">
          Submit
        </Button>
        &nbsp;
        <Button variant="contained">Cancel</Button>
      </form>
    </Box>
  );
}
