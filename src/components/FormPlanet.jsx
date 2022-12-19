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
    </section>
  );
}
