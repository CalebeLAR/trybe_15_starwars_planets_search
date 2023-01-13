import { useContext } from 'react';
import ContextPlanets from '../context/ContextPlanets';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const {
    input,
    numFilters,
    changeInput,
    valueOptions,
    removeFilter,
    onButtonClickFilter,
  } = useContext(ContextPlanets);

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
        {
          (valueOptions.length) ? (
            <label htmlFor="column" className="div-input">
              <h6>Coluna</h6>
              <select
                data-testid="column-filter"
                id="column"
                value={ input.column }
                onChange={ (event) => changeInput(event) }
              >
                {
                  valueOptions.map((valueOption, i) => (
                    <option
                      key={ i }
                      value={ valueOption }
                    >
                      {valueOption}
                    </option>
                  ))
                }
              </select>
            </label>
          ) : (
            <h1>sem colunas</h1>
          )
        }
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
          onClick={ () => onButtonClickFilter() }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          id={ Object.keys(numFilters).length ? 'btnRmAllOn' : 'btnRmAllOff' }
          disabled={ !Object.keys(numFilters).length }
          onClick={ () => removeFilter('all') }
        >
          Remover todas filtragens
        </button>
      </section>
      <section>
        {
          Object.keys(numFilters).map((f, i) => (
            <section
              key={ i }
              id="sectionFilter"
              data-testid="filter"
            >
              <div>
                <p>{f}</p>
              </div>
              <button
                type="button"
                onClick={ () => removeFilter(f) }
              >
                X
              </button>
            </section>
          ))
        }
      </section>
    </section>
  );
}
