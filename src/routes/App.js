import { useState, useEffect } from 'react';
import Table from '../components/Table';
import SearchedPlanets from '../hooks/SearchedPlanets';

function App() {
  const [dataRequest, setDateRequest] = useState([]);

  const removeResidentsAndSetData = (results) => {
    results.forEach((element, index, array) => {
      if (element.residents) {
        // monta um novo objeto
        const newObj = {};
        const keys = Object.keys(element);
        keys.forEach((key) => {
          if (key !== 'residents') {
            newObj[key] = element[key];
          }
        });
        // la no array results ele troca o elemento que está com o objeto com a chave residents
        // pelo novo objeto sem essa chave
        array[index] = newObj;
      }
    });
    setDateRequest(results);
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
    <SearchedPlanets.Provider value={ dataRequest }>
      <main>
        <h1>Planet star warts</h1>
        <Table />l
      </main>
    </SearchedPlanets.Provider>
  );
}

export default App;
