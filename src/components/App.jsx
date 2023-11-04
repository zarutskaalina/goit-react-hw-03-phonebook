import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactsForm } from './ContactForm/ContactsForm';
import { ContactsList } from './ContactList/ContactsList';
import { nanoid } from 'nanoid';
import { SearchFile } from './SearchFile/SearchFile';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddName = contactsData => {
    const { name, number } = contactsData;
    const { contacts } = this.state;

    const existingContact = contacts.some(contact => contact.name === name);

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const finalContact = { name, number, id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, finalContact],
      }));
    }
  };

  handleFilterInput = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFindContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().startsWith(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const findContacts = this.getFindContact();
    return (
      <div>
        <Section title="Phonebook">
          <ContactsForm handleAddName={this.handleAddName} />
        </Section>
        <Section title="Contacts">
          <SearchFile
            onChange={this.handleFilterInput}
            filter={this.state.filter}
          />
          <ContactsList
            contacts={findContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </Section>
      </div>
    );
  }
}
