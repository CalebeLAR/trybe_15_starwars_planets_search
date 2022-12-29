import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput] = useInput();
  const [numericFilterSelected, setNumericFilterSelected] = useState([]);
  const [inputsFilterSelected, setInputsFilterSelected] = useState([]);
  const [filters, setFilters] = useState([]);

  const filterByNumericInputs = () => {
    // ela pega os valores que estão nos inputs numéricos, e usa eles para montar a condição de filtragem
    // coloca o planeta filtrado no estado local.
    const { column, comparison, value } = input;

    switch (comparison) {
    case 'maior que':
      setNumericFilterSelected(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      ));
      setFilters([...filters, fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      )]);
      break;
    case 'menor que':
      setNumericFilterSelected(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) < value,
      ));
      setFilters([...filters, fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) < value,
      )]);
      break;
    default:
      setNumericFilterSelected(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) === value,
      ));
      setFilters([...filters, fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) === value,
      )]);
    }
  };

  const checksIfTheFilterIsValid = () => {
    // verifica se os inputs de filtro ja foram selecionados ou não.
    // caso esse filtro ainda não seja adicionado, então permite filtrar e
    // armazenar o planetas filtrados em numericFilterSelected
    const { column, comparison, value } = input;
    const newInputFilter = column + comparison + value;
    if (!inputsFilterSelected.includes(newInputFilter)) {
      setInputsFilterSelected([...inputsFilterSelected, newInputFilter]);
      filterByNumericInputs();
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    fetchedPlanets,
    input,
    changeInput,
    numericFilterSelected,
    filters,
    checksIfTheFilterIsValid,
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
