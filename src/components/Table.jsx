import { useContext } from 'react';
import ContextPlanets from '../context/ContextPlanets';
import './styles/Table.css';

function Table() {
  const {
    input,
    numFilters,
    fetchedPlanets,
  } = useContext(ContextPlanets);

  const filterByAllNumericFilters = (fil) => {
    // pega todos os arrays de filters e junta todos os planets deles em arrTot
    // pega todos os planets que se repentem em ambos os arrays de filters
    // retorna o os planets comuns a todos os filtros
    const arrPlanets = Object.values(fil);
    const arrNoEnptys = arrPlanets.filter((arr) => arr.length);
    const arrTot = (arrPlanets.length) ? [...arrPlanets].reduce((acc, curr) => {
      acc = [...acc, ...curr];
      return acc;
    }) : [fetchedPlanets];
    const filteredByAllFilters = arrTot.reduce((acc, curr, index, array) => {
      const a = array.filter((p) => p.name === curr.name);
      if (a.length === arrNoEnptys.length) {
        const ad = acc.map((p) => p.name);
        if (!ad.includes(curr.name)) {
          acc = [...acc, curr];
          return acc;
        }
      }
      return acc;
    }, []);
    return filteredByAllFilters;
  };
  const filterPlanetsByName = () => {
    const planets = filterByAllNumericFilters(numFilters);

    if (planets.length === 0) {
      return fetchedPlanets.filter(
        (p) => p.name.includes(input.name),
      );
    }
    return planets.filter(
      (p) => p.name.includes(input.name),
    );
  };
  if (!fetchedPlanets.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation</th>
          <th>Orbital_Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          filterPlanetsByName().map((planet) => (
            <tr key={ planet.name }>
              <td><p data-testid="planet-name">{planet.name}</p></td>
              <td><p>{planet.rotation_period}</p></td>
              <td><p>{planet.orbital_period}</p></td>
              <td><p>{planet.diameter}</p></td>
              <td><p>{planet.climate}</p></td>
              <td><p>{planet.gravity}</p></td>
              <td><p>{planet.terrain}</p></td>
              <td><p>{planet.surface_water}</p></td>
              <td><p>{planet.population}</p></td>
              <td>{planet.films.map((fil, i) => (<p key={ i }>{`\n${fil}`}</p>))}</td>
              <td><p>{planet.created}</p></td>
              <td><p>{planet.edited}</p></td>
              <td><p>{planet.url}</p></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
