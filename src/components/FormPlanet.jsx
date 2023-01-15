import { useContext } from 'react';
import ContextPlanets from '../context/ContextPlanets';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const {
    input,
    changeSort,
    allColumns,
    numFilters,
    changeInput,
    valueOptions,
    removeFilter,
    onButtonSortFilter,
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
          id={ Object.keys(numFilters).length ? 'btnRmAllOn' : 'btnRmAllOff' }
          type="button"
          onClick={ () => removeFilter('all') }
          disabled={ !Object.keys(numFilters).length }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens
        </button>
        <div className="div-sort">
          <label htmlFor="columnSortInputAsc">
            <h6>ascendente</h6>
            <input
              id="columnSortInputAsc"
              type="radio"
              name="columnSort"
              value="ASC"
              onClick={ (e) => changeSort(e) }
              defaultChecked
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="columnSortInputDesc">
            <h6>descendente</h6>
            <input
              id="columnSortInputDesc"
              name="columnSort"
              type="radio"
              value="DESC"
              onClick={ (e) => changeSort(e) }
              data-testid="column-sort-input-desc"
            />
          </label>
          <label htmlFor="sortFilter">
            <h6>Coluna</h6>
            <select
              id="columnSort"
              data-testid="column-sort"
              onClick={ (e) => changeSort(e) }
            >
              {
                allColumns.map((valueOption, i) => (
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
          <button
            id="btnSort"
            type="button"
            data-testid="column-sort-button"
            onClick={ () => onButtonSortFilter() }
          >
            sort
          </button>
        </div>
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
