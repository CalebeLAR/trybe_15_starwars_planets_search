import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import useInput from '../hooks/useInput';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const inputName = useInput('');
  const inputColumn = useInput('population');
  const inputComparison = useInput('maior que');
  const inputValue = useInput('0');

  const [numericFilter, setNumericFilter] = useState('ainda não filtrado');

  const filterByNumericInputs = () => {
    const { inputValue: column } = inputColumn;
    const { inputValue: comparision } = inputComparison;
    const { inputValue: value } = inputValue;

    switch (comparision) {
    case 'igual a':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => planet[column] === value && planet[column] !== 'unknown',
      ));
      break;
    case 'maior que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => planet[column] > value && planet[column] !== 'unknown',
      ));
      break;
    case 'menor que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => planet[column] < value && planet[column] !== 'unknown',
      ));
      break;
    default:
      console.log(value);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const value = {
    fetchedPlanets,
    inputName,
    inputColumn,
    inputComparison,
    inputValue,
    filterByNumericInputs,
    numericFilter,
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
