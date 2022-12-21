import { useContext } from 'react';
import SearchedPlanets from '../context/SearchedPlanets';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const {
    inputName,
    inputColumn,
    inputComparison,
    inputValue,
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
      <div>
        <label htmlFor="columnFilter">
          Filtros
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
      </div>
      <div>
        <label htmlFor="comparisonFilter">
          Operador
          <select
            id="comparisonFilter"
            data-testid="comparison-filter"
            value={ inputComparison.inputValue }
            onChange={ (event) => inputComparison.handlesChange(event) }
          >
            <option value="maior">maior que</option>
            <option value="menor">menor que</option>
            <option value="igual">igual a</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="valueFilter">
          <h6>FILTER POPULATION</h6>
          <input
            data-testid="value-filter"
            id="valueFilter"
            value={ inputValue.inputValue }
            type="number"
            onChange={ (event) => inputValue.handlesChange(event) }
          />
        </label>
      </div>
      <div>
        <button
          data-testid="button-filter"
          type="button"
        >
          Filtrar
        </button>
      </div>
    </section>
  );
}
