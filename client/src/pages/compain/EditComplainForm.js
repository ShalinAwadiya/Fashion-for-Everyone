import * as React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditComplainForm = () => {
  const navigate = useNavigate();

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

  const submitButtonHandler = (event) => {
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
      navigate("/");
    }
  };

  return (
    <Box
      border={2}
      borderColor="rgb(26,125,230)"
      height={500}
      width={500}
      padding="20px"
      margin="auto"
      marginTop="100px"
      display="flex"
    >
      <form>
        <h2>Edit Complain</h2>
        <TextField
          required
          multiline
          id="name-input"
          name="name"
          label="Complain Subject"
          type="text"
          width="300"
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
          style={{ width: "350px" }}
          label="Complain Description"
          type="text"
          onChange={complainDescriptionHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {complainDescriptionError}
        </span>
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
        <br />
        <br />
        <br />
        <Button onClick={submitButtonHandler} variant="contained">
          Update
        </Button>
        &nbsp;
        <Button variant="contained">Cancel</Button>
      </form>
    </Box>
  );
};
export default EditComplainForm;