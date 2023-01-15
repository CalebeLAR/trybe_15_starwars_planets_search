import { useContext } from 'react';
import ContextPlanets from '../context/ContextPlanets';
import './styles/Table.css';

const MAGIC = 100000000000000;
const SORT = -1;
function Table() {
  const {
    input,
    numFilters,
    sortFilter,
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
  const mountColumn = (a, b, columnSort, sortMethod) => {
    if (sortMethod === 'ASC') {
      const columnA = parseInt(a[columnSort], 10)
        ? parseInt(a[columnSort], 10) : MAGIC;
      const columnB = parseInt(b[columnSort], 10)
        ? parseInt(b[columnSort], 10) : MAGIC;
      return [columnA, columnB];
    }
    const columnA = parseInt(a[columnSort], 10)
      ? parseInt(a[columnSort], 10) : SORT;
    const columnB = parseInt(b[columnSort], 10)
      ? parseInt(b[columnSort], 10) : SORT;
    return [columnA, columnB];
  };

  const hofSort = (a, b) => {
    const [columnSort, sort] = sortFilter;
    if (sort === 'null') {
      console.log('null');
      return fetchedPlanets;
    }
    const [columnA, columnB] = mountColumn(a, b, columnSort, sort);
    if (sort === 'ASC') {
      if (columnA < columnB) {
        return SORT;
      }
      if (columnA > columnB) {
        return 1;
      }
    } else {
      if (columnA < columnB) {
        return 1;
      }
      if (columnA > columnB) {
        return SORT;
      }
    }
  };
  const sortAndFilterByName = filterPlanetsByName().sort(hofSort);

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
          sortAndFilterByName.map((planet) => (
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
