import React, { useState } from "react";
import "./ComplainTable.css";
import complain_data from "../../data/complain_data";

const ComplainTable = (props) => {
  const [complains, setComplains] = useState(complain_data);

  const handleDeleteClick = (complainId) => {
    console.log("hello");
    const newComplains = [...complains];

    const index = complains.findIndex(
      (complain) => complain.complainId === complainId
    );

    newComplains.splice(index, 1);
    setComplains(newComplains);
  };

  return (
    <div className="center">
      <table className="content-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>Attachment</th>
            <th>Status</th>
            <th>Reply</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complains.map((complain) => (
            <tr>
              <td>{complain.complainSubject}</td>
              <td>{complain.complainDescription}</td>
              <td>
                <a href="/" style={{ textDecoration: "none" }}>
                  View
                </a>
              </td>
              <td>{complain.complainStatus}</td>
              <td>
                {complain.complainStatus !== "Pending" ? (
                  <a
                    href="/viewComplainReply"
                    style={{ textDecoration: "none" }}
                  >
                    View
                  </a>
                ) : (
                  <span>View</span>
                )}
              </td>
              <td>
                <a href="/" style={{ textDecoration: "none" }}>
                  Edit
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  onClick={() => handleDeleteClick(complain.complainId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplainTable;
