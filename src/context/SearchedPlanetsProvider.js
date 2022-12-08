import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [arrayDependence] = useState(0);
  const [dataRequest, setDateRequest] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

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
    setTableHeaders(Object.keys(results[0]));
  };

  useEffect(() => {
    const fetchPlanets = () => {
      const URL = 'https://swapi.py4e.com/api/planets';
      fetch(URL)
        .then((request) => request.json())
        .then((data) => data.results)
        .then((results) => removeResidentsAndSetData(results))
        .catch((error) => console.error(error));
    };

    fetchPlanets();
  }, [arrayDependence]);

  return (
    <SearchedPlanets.Provider value={ { dataRequest, tableHeaders } }>
      {children}
    </SearchedPlanets.Provider>
  );
}

SearchedPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SearchedPlanetsProvider;
