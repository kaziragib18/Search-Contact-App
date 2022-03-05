import React from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
  console.log(props);
  const inputElement = useRef("");

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id} />
    )
  })

  const getSearchTerm = () => {
    // console.log(inputElement);
    props.searchKeyword(inputElement.current.value);
  }

  return (
    <div className='main'>
      <h2>Contact List
        <Link to="/add">
          <button style={{ marginLeft: "100px" }} className='ui button blue right'>Add New Contact</button>
        </Link>
      </h2>
      <div className='ui search'>
        <div className='ui icon input'>
          <input
            ref={inputElement}
            type="text"
            placeholder='Search Contact'
            className='prompt'
            value={props.term}
            onChange={getSearchTerm} />
          <i className='search icon'></i>
        </div>
      </div>
      <div className='ui celled list'>{renderContactList.length > 0 ? renderContactList : "No Results!"}</div>
    </div>
  )
};

export default ContactList;