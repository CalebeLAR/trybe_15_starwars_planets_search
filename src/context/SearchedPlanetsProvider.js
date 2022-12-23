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
  const inputValue = useInput(0);

  const [numericFilter, setNumericFilter] = useState('ainda não filtrado');

  const filterByNumericInputs = () => {
    // ela pega os valores que estão nos inputs numéricos, e usa eles para montar a condição de filtragem
    // coloca o planeta filtrado no estado local.
    const { inputValue: column } = inputColumn;
    const { inputValue: comparision } = inputComparison;
    const { inputValue: value } = inputValue;

    switch (comparision) {
    case 'maior que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      ));
      break;
    case 'menor que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) < value,
      ));
      break;
    default:
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) === value,
      ));
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
