import { useState, useEffect } from 'react';
import Table from '../components/Table';

function App() {
  const [dataRequest, setDateRequest] = useState([]);

  const mountDataPlanets = (arrayEntries) => {
    const obj = {};
    arrayEntries.forEach((entires) => {
      const [key, value] = entires;
      obj[key] = value;
    });
    return obj;
  };

  const removeResidentsAndSetData = (results) => {
    const newPlanetData = [];
    results.forEach((planet) => {
      const first = Object.entries(planet);
      const second = first.filter((entries) => entries[0] !== 'residents');
      const third = mountDataPlanets(second);
      newPlanetData.push(third);
    });
    setDateRequest(newPlanetData);
  };

  const fetchPlanets = () => {
    const URL = 'https://swapi.py4e.com/api/planets';
    fetch(URL)
      .then((request) => request.json())
      .then((data) => data.results)
      .then((results) => removeResidentsAndSetData(results))
      .catch((error) => console.error(error));
    // .finally(console.log('finaly'));
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <main>
      <h1>Planet star warts</h1>
      <Table />
    </main>
  );
}

export default App;
