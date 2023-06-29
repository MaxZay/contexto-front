import React from 'react';
import styles from './Select.module.css';

const Select = ({ options, children, ...props }) => {
  return (
    <select className={styles.select} {...props}>
      {options &&
        options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default Select;
