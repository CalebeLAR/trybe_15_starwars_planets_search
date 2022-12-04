import React from 'react';
import './FormPlanet.css';

export default function FormPlanet() {
  return (
    <section className="searchBar">
      <div>
        <label htmlFor="nameFilter">
          <h1>SEARCH PLANET</h1>
          <input
            data-testid="name-filter"
            id="nameFilter"
            type="text"
          />
        </label>
      </div>
    </section>
  );
}
