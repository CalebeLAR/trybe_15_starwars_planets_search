import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import useInputName from '../hooks/useInputName';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [inputName, handlesChange] = useInputName();

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <SearchedPlanets.Provider value={ { fetchedPlanets, inputName, handlesChange } }>
      {children}
    </SearchedPlanets.Provider>
  );
}

SearchedPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SearchedPlanetsProvider;
