import { useContext } from 'react';
import SearchedPlanets from '../context/SearchedPlanets';
import './styles/FormPlanet.css';

export default function FormPlanet() {
  const { inputName, handlesChange } = useContext(SearchedPlanets);
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
            onChange={ (event) => handlesChange(event) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="selectFilter">
          Filtros
          <select id="selectFilter" data-testid="column-filter">
            <option value="population">population</option>
            <option value="orbital_period">orbital period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation period</option>
            <option value="surface_water">surface water</option>
          </select>
        </label>
      </div>
    </section>
  );
}
