import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import useInput from '../hooks/useInput';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [inputName, ChangeName] = useInput();
  // const [inputColumn, ChangeColumn] = useInput();
  // const [inputColumn, ChangeColumn] = useInput();

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
