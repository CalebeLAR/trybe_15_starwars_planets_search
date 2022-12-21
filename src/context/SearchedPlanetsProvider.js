import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import useInput from '../hooks/useInput';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const inputName = useInput('');
  const inputColumn = useInput('population');
  const inputComparison = useInput('igual a');
  const inputValue = useInput('0');

  useEffect(() => {
    fetchPlanets();
  }, []);

  const value = {
    fetchedPlanets,
    inputName,
    inputColumn,
    inputComparison,
    inputValue,
  };

  return (
    <SearchedPlanets.Provider value={ value }>
      {children}
    </SearchedPlanets.Provider>
  );
}

SearchedPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SearchedPlanetsProvider;
