import React from "react";
import "./ComplainForm.css";

const ComplainForm = () => {
  return (
    <div className="form-center">
      <label className="label1 heading">Post Complain</label>
      <form action="/viewComplain">
        <table>
          <tr>
            <td>
              <label className="fonts" for="subject">
                Complain Subject:
              </label>
              <br />
              <br />
            </td>
            <td>
              <input
                className="input1"
                type="text"
                id="fname"
                name="fname"
                style={{ "font-style": "italic" }}
                placeholder="Enter  Complain  Subject"
              />
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <label className="fonts" for="textarea">
                Complain Description:
              </label>
              <br />
              <br />
            </td>
            <td>
              <textarea
                name="textarea"
                id="textarea"
                className="input2"
                style={{ "font-style": "italic" }}
                required
                placeholder="Enter Complain Description"
              ></textarea>
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <label className="fonts" for="file">
                Complain Attachment(if):
              </label>
              <br />
              <br />
              <br />
              <br />
            </td>
            <td>
              <input type="file" id="file" name="file" />
              <br />
              <br />
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="submit"
                className="fonts"
                style={{
                  "background-color": "rgb(95, 148, 241)",
                  color: "white",
                }}
                value="Submit"
              >
                Submit
              </button>
              &nbsp;
              <button type="cancel" className="fonts" value="Cancel">
                Cancel
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default ComplainForm;
