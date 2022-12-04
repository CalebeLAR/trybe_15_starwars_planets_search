import { useContext } from 'react';
import SearchedPlanets from '../context/SearchedPlanets';
// import './Table.css';

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
          <th>Created</th>
          <th>Edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          dataRequest.map((planet) => (
            <tr key={ planet.name }>
              <td><p>{planet.name}</p></td>
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
