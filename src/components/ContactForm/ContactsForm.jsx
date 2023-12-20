import { Component } from 'react';
import style from './ContactsForm.module.css';

export class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const number = e.target.number;

    this.setState({
      [name]: value,
      [number]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const contactsData = {
      name: e.currentTarget.elements.name.value,
      number: e.currentTarget.elements.number.value,
    };

    this.props.handleAddName(contactsData);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={style.form}>
        <label>
          <p className={style.labelText}>Name</p>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label>
          <p className={style.labelText}>Number</p>
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleInputChange}
            pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
