// Shalin Hasanbhai Awadiya - B00892907
import * as React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AXIOS_CLIENT from "../../utils/apiClient";

export default function ReplyComplain() {
  const navigate = useNavigate();
  const { complainId } = useParams();

  const [replySubject, setReplySubject] = useState("");
  const [replyDescription, setReplyDescription] = useState("");

  const [replySubjectError, setReplySubjectError] = useState("");
  const [replyDescriptionError, setReplyDescriptionError] = useState("");

  const replySubjectHandler = (event) => {
    setReplySubject(event.target.value);

    if (event.target.value === "") {
      setReplySubjectError("Reply Subject cannot be empty");
    } else {
      setReplySubjectError("");
    }
  };
  const replyDescriptionHandler = (event) => {
    setReplyDescription(event.target.value);

    if (event.target.value === "") {
      setReplyDescriptionError("Reply Message cannot be empty");
    } else {
      setReplyDescriptionError("");
    }
  };

  const submitButtonHandler = async (event) => {
    event.preventDefault();
    let replySubjectCheck = true;
    let replyDescriptionCheck = true;
    console.log(replySubject, replyDescription);
    if (replySubject === "") {
      replySubjectCheck = false;
      setReplySubjectError("Reply Subject cannot be empty");
    }
    if (replyDescription === "") {
      replyDescriptionCheck = false;
      setReplyDescriptionError("Reply Message cannot be empty");
    }
    if (replySubjectCheck === true && replyDescriptionCheck === true) {
      var today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const complainDetails = {
        complainId: complainId,
        complainStatus: "Replied",
        replySubject: replySubject,
        replyMessage: replyDescription,
        replyDate: date,
        replyTime: time,
      };
      /*
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complainDetails),
      };
      const response = await fetch(
        "http://localhost:8080/complains/admin/insertComplainReply",
        requestOptions
      );
      const data = await response.json();
      */
      const response = await AXIOS_CLIENT.put(
        "/complains/admin/insertComplainReply",
        complainDetails
      );
      console.log(response.data);
      navigate("/admin/view_complain");
    }
  };

  return (
    <Box
      className="border rounded"
      height={400}
      width={500}
      padding="20px"
      margin="auto"
      marginTop="50px"
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
          onChange={replySubjectHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {replySubjectError}
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
          onChange={replyDescriptionHandler}
        />
        <br />
        <span style={{ color: "red", fontSize: "10px" }}>
          {replyDescriptionError}
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
