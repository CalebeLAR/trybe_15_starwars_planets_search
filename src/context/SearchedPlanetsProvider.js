import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [dataRequest, fetchPlanets] = useFetchPlanet();
  useEffect(() => {
    fetchPlanets();
  });
  return (
    <SearchedPlanets.Provider value={ { dataRequest } }>
      {children}
    </SearchedPlanets.Provider>
  );
}

SearchedPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SearchedPlanetsProvider;
