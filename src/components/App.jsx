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

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (!parsedContacts) {
      this.setState({
        contacts: this.state.contacts,
      });
    } else {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    // prevState - попередній.початковий стан
    // if (prevState.contacts !== contacts) {
    const stringifiedContact = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContact);
    // }
  }

  handleAddName = contactsData => {
    const { name, number } = contactsData;
    const { contacts } = this.state;

    if (!contacts) {
      console.error('Contacts array is null or undefined.');
      return;
    }

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

    const filteredContacts = contacts
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;

    return filteredContacts;
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
