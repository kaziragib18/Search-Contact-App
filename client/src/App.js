import React, { useEffect } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactDetail from './components/ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
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
        <Router>
          <Header />
          <Switch>
            <Route exact path="/"
              render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />
            <Route path="/add"
              render={(props) => <AddContact {...props} addContactHandler={addContactHandler} />} />

            <Route path="/contact/:id" component={ContactDetail} />
          </Switch>
        </Router>
      </div>
    </div>

  );
}

export default App;
