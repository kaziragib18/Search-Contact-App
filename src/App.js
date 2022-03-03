import React, { useEffect } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import './App.css';
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, contact]);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);


  return (
    <div className='App'>
      <div className="ui container">
        <Header />
        <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} />
      </div>
    </div>

  );
}

export default App;
