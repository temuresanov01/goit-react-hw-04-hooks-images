import React from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.List}>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}
        <span className={styles.Span}>{number}</span>
        <button
          className={styles.ButtonDelete}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
