// Shalin Hasanbhai Awadiya - B00892907
import * as React from "react";
import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AXIOS_CLIENT from "../../utils/apiClient";

const EditComplainForm = () => {
  const [complainSubject, setComplainSubject] = useState("");
  const [complainDescription, setComplainDescription] = useState("");
  const [complainAttachment, setComplainAttachment] = useState("");

  const [complainSubjectError, setComplainSubjectError] = useState("");
  const [complainDescriptionError, setComplainDescriptionError] = useState("");

  const navigate = useNavigate();
  const { complainId } = useParams();
  let subject, description;
  const getComplain = async () => {
    console.log(complainId);
    /*
    const response = await fetch(
      "http://localhost:8080/complains/user/getComplain/" + complainId
    );
    const data = await response.json();
    subject = data.complain[0].complainSubject;
    description = data.complain[0].complainDescription;
    */
    const response = await AXIOS_CLIENT.get(
      "/complains/user/getComplain/" + complainId
    );
    subject = response.data.complain[0].complainSubject;
    description = response.data.complain[0].complainDescription;
    console.log("subject", subject);
    setComplainSubject(subject);
    console.log("description", description);
    setComplainDescription(description);
  };
  useEffect(() => {
    getComplain();
  }, []);

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
        complainId: complainId,
        complainSubject: complainSubject,
        complainDescription: complainDescription,
        complainDate: date,
        complainTime: time,
        complainImage: "base64",
      };
      /*
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complainDetails),
      };
      const response = await fetch(
        "http://localhost:8080/complains/user/editComplain/",
        requestOptions
      );
      const data = await response.json();
      */
      const response = await AXIOS_CLIENT.put(
        "/complains/user/editComplain/",
        complainDetails
      );
      console.log(response);
      console.log(date, time, response.data.message);
      navigate("/view_complain");
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
          InputLabelProps={{ shrink: true }}
          defaultValue={complainSubject}
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
          InputLabelProps={{ shrink: true }}
          defaultValue={complainDescription}
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
          Update
        </Button>
        &nbsp;
        <Button variant="contained">Cancel</Button>
      </form>
    </Box>
  );
};
export default EditComplainForm;
