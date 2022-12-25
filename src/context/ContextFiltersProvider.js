import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ContextFilters from './ContextFilters';
import ContextPlanets from './ContextPlanets';
import useInput from '../hooks/useInput';

function ContextFiltersProvider({ children }) {
  const { fetchedPlanets } = useContext(ContextPlanets);
  const [input, changeInput] = useInput();
  const [numericFilter, setNumericFilter] = useState('ainda não filtrado');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

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

  const value = {
    input,
    changeInput,
    filteredPlanets,
    filterByNumericInputs,
  };

  return (
    <ContextFilters.Provider value={ value }>
      {children}
    </ContextFilters.Provider>
  );
}

ContextFiltersProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ContextFiltersProvider;
