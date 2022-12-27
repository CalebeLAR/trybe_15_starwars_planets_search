import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput] = useInput();
  const [numericFilter, setNumericFilter] = useState('ainda não filtrado');

  const filterByNumericInputs = () => {
    // ela pega os valores que estão nos inputs numéricos, e usa eles para montar a condição de filtragem
    // coloca o planeta filtrado no estado local.
    const { column, comparison, value } = input;

    switch (comparison) {
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
  }, [fetchPlanets]);

  const value = {
    fetchedPlanets,
    input,
    changeInput,
    numericFilter,
    filterByNumericInputs,
  };

  return (
    <ContextPlanets.Provider value={ value }>
      {children}
    </ContextPlanets.Provider>
  );
}

ContextPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default ContextPlanetsProvider;
