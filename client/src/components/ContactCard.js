import React from 'react'
import { Link } from 'react-router-dom';
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div style={{ padding: "15px" }} className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
        <Link to={{ pathname: `/update`, state: { contact: props.contact } }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "green", paddingTop: "7px", fontSize: 20 }}
          ></i>
        </Link>

        <i
          className="trash alternate outline icon"
          style={{ color: "red", paddingTop: "7px", marginLeft: "20px", fontSize: 20 }}
          onClick={() => props.clickHandler(id)}
        ></i>

      </div>
    </div>

  );
};

export default ContactCard;
