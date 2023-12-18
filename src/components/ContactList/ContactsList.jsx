import { Component } from 'react';
import style from './ContactList.module.css';

export class ContactsList extends Component {
  handleDeleted = contactId => {
    this.props.onDeleteContact(contactId);
  };

  render() {
    const { contacts } = this.props;
    console.log(contacts);

    return (
      <ul className={style.contactList}>
        {contacts.map(contact => (
          <li key={contact.id} className={style.contactName}>
            {contact.name}: {contact.number}
            <button
              className={style.button}
              type="button"
              onClick={() => this.handleDeleted(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
