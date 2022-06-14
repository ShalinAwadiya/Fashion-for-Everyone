import React from "react";
import "./ComplainForm.css";

const ComplainForm = () => {
  return (
    <div className="form-center mt-5 mx-auto rounded w-75">
      <h2 className="text-center">Post Complain</h2>
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
                className="form-control mt-3"
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
                className="form-control"
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
              <input type="file" className="form-control mt-3" id="file" name="file" />
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
                className="btn btn-primary"
                style={{
                  "background-color": "rgb(95, 148, 241)",
                  color: "white",
                }}
                value="Submit"
              >
                Submit
              </button>
              &nbsp;
              <button type="cancel" className="btn btn-secondary" value="Cancel">
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
