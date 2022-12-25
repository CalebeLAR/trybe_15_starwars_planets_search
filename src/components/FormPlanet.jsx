import { useContext } from 'react';
import ContextFilters from '../context/ContextFilters';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const {
    input,
    changeInput,
    filterByNumericInputs,
  } = useContext(ContextFilters);

  return (
    <section className="searchBar">
      <div>
        <label htmlFor="nameFilter">
          <h1>SEARCH PLANET</h1>
          <input
            data-testid="name-filter"
            id="name"
            value={ input.name }
            type="text"
            onChange={ (event) => changeInput(event) }
          />
        </label>
      </div>
      <section id="sb-col">
        <label htmlFor="column" className="div-input">
          <h6>Coluna</h6>
          <select
            data-testid="column-filter"
            id="column"
            value={ input.column }
            onChange={ (event) => changeInput(event) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison" className="div-input">
          <h6>Operador</h6>
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ input.comparison }
            onChange={ (event) => changeInput(event) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value" className="div-input">
          <h6>Valor</h6>
          <input
            data-testid="value-filter"
            id="value"
            value={ input.value }
            type="number"
            min={ 0 }
            onChange={ (event) => changeInput(event) }
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
