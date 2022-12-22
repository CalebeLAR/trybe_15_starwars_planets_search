import { useContext } from 'react';
import SearchedPlanets from '../context/SearchedPlanets';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const {
    inputName,
    inputColumn,
    inputComparison,
    inputValue,
    filterByNumericInputs,
  } = useContext(SearchedPlanets);

  return (
    <section className="searchBar">
      <div>
        <label htmlFor="nameFilter">
          <h1>SEARCH PLANET</h1>
          <input
            data-testid="name-filter"
            id="nameFilter"
            value={ inputName.inputValue }
            type="text"
            onChange={ (event) => inputName.handlesChange(event) }
          />
        </label>
      </div>
      <section id="sb-col">
        <label htmlFor="columnFilter" className="div-input">
          <h6>Coluna</h6>
          <select
            id="columnFilter"
            data-testid="column-filter"
            value={ inputColumn.inputValue }
            onChange={ (event) => inputColumn.handlesChange(event) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation period</option>
            <option value="surface_water">surface water</option>
          </select>
        </label>
        <label htmlFor="comparisonFilter" className="div-input">
          <h6>Operador</h6>
          <select
            id="comparisonFilter"
            data-testid="comparison-filter"
            value={ inputComparison.inputValue }
            onChange={ (event) => inputComparison.handlesChange(event) }
          >
            <option value="igual a">igual a</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="valueFilter" className="div-input">
          <h6>Valor</h6>
          <input
            data-testid="value-filter"
            id="valueFilter"
            value={ inputValue.inputValue }
            type="number"
            min={ 0 }
            onChange={ (event) => inputValue.handlesChange(event) }
          />
        </label>
        <button
          id="btnFilter"
          data-testid="button-filter"
          type="button"
          onClick={ () => filterByNumericInputs() }
        >
          Filtrar
        </button>
      </section>
    </section>
  );
}
