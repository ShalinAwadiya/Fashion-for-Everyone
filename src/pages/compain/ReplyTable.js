import React from "react";
import "./ReplyTable.css";
import reply_complain from "../../data/reply_complain";

const ReplyTable = (props) => {
  return (
    <div className="reply-center">
      <table className="content-table">
        <thead>
          <tr>
            <th>Reply Subject</th>
            <th>Reply Message</th>
            <th>Reply Date</th>
            <th>Reply Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{reply_complain[0].replySubject}</td>
            <td>{reply_complain[0].replyMessage}</td>
            <td>{reply_complain[0].replyDate}</td>
            <td>{reply_complain[0].replyTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReplyTable;
