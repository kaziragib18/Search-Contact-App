import React, { useEffect } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import Header from './components/Header';
import ContactDetail from './components/ContactDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from './api/contacts';
import './App.css';
import UpdateContact from './components/UpdateContact';

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  //Retrive contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    console.log(contact);
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const { id, name, email } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  const searchHandler = (search) => {
    // console.log(search);
    setSearch(search);
    if (search !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts);
    }
    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='App'>
      <div className="ui container">
        <Router>
          <Header />
          <Switch>

            <Route exact path="/"
              render={(props) => (<ContactList
                {...props}
                contacts={search.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                term={search}
                searchKeyword={searchHandler} />)} />

            <Route path="/add"
              render={(props) => <AddContact {...props} addContactHandler={addContactHandler} />} />

            <Route path="/update"
              render={(props) => <UpdateContact {...props} updateContactHandler={updateContactHandler} />} />

            <Route path="/contact/:id" component={ContactDetail} />
          </Switch>
        </Router>
      </div>
    </div>

  );
}

export default App;
