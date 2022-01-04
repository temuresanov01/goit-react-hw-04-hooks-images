import { useState } from 'react';
import styles from './ContactForm.module.css';
import shortid from 'shortid';
import PropTypes from 'prop-types';

export default function ContactForm({ onSubmitFunction, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const onInputNumberChange = e => setNumber(e.currentTarget.value);
  const onInputNameChange = e => setName(e.currentTarget.value);

  const onSubmit = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    contacts.forEach(element => {
      if (element.name.includes(contact.name)) {
        contact.name = null;
        return alert('contact is already in the directory');
      }
    });
    if (contact.name === null) {
      reset();
      return;
    }
    onSubmitFunction(contact);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={onSubmit} className={styles.Form}>
      <label className={styles.Label}>
        Name
        <input
          className={styles.Input}
          onChange={onInputNameChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={styles.Label}>
        Number
        <input
          className={styles.Input}
          onChange={onInputNumberChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button>Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmitFunction: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object),
};
