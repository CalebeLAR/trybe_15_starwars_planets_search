import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/FormPlanet.css';

export default function FormPlanet({ tableHeaders }) {
  const [inputName, setInputName] = useState('');
  console.log(tableHeaders, 'formPlanet');
  return (
    <section className="searchBar">
      <div>
        <label htmlFor="nameFilter">
          <h1>SEARCH PLANET</h1>
          <input
            data-testid="name-filter"
            id="nameFilter"
            value={ inputName }
            type="text"
            onChange={ ({ target }) => setInputName(target.value) }
          />
        </label>
      </div>
    </section>
  );
}

FormPlanet.propTypes = {
  tableHeaders: PropTypes.arrayOf({}).isRequired,
};
