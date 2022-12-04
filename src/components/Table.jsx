import { useContext } from 'react';
import SearchedPlanets from '../context/SearchedPlanets';
import './Table.css';

function Table() {
  const { dataRequest } = useContext(SearchedPlanets);
  console.log(dataRequest);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation</th>
          <th>Orbital Priodi</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          dataRequest.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.Rotation}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.population}</td>
              <td>{planet.population}</td>
              <td>{planet.population}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
