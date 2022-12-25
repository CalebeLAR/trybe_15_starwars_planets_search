import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import useInput from '../hooks/useInput';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput] = useInput();
  const [numericFilter, setNumericFilter] = useState('ainda não filtrado');

  const filterByNumericInputs = () => {
    // ela pega os valores que estão nos inputs numéricos, e usa eles para montar a condição de filtragem
    // coloca o planeta filtrado no estado local.
    const { column, comparison, value } = input;
    console.log(column, comparison, value);

    switch (comparison) {
    case 'maior que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      ));
      console.log(numericFilter);
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
  }, [fetchPlanets]);

  const value = {
    fetchedPlanets,
    input,
    changeInput,
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
