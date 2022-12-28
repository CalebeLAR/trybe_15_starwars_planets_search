import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput] = useInput();
  const [numericFilter, setNumericFilter] = useState([]);
  const [inputsFilter, setInputsFilter] = useState([]);
  const [filters, setFilters] = useState([]);
  const [plantes, setPlanets] = useState([]);

  const filterByAllNumericFilters = () => {
    // pega todos os arrays de filters e junta todos os planets deles em arrTot
    // pega todos os planets que se repentem em ambos os arrays de filters
    // retorna o os planets comuns a todos os filtros
    const arrTot = (filters.length) ? filters.reduce((acc, curr) => {
      acc = [...acc, ...curr];
      return acc;
    }) : numericFilter;
    const filteredByAllFilters = arrTot.reduce((acc, curr, index, array) => {
      const a = array.filter((p) => p.name === curr.name);
      if (a.length === filters.length) {
        const ad = acc.map((p) => p.name);
        if (!ad.includes(curr.name)) {
          acc = [...acc, curr];
          return acc;
        }
      }
      return acc;
    }, []);
    setPlanets(filteredByAllFilters);
  };

  const filterByNumericInputs = () => {
    // ela pega os valores que estão nos inputs numéricos, e usa eles para montar a condição de filtragem
    // coloca o planeta filtrado no estado local.
    const { column, comparison, value } = input;

    switch (comparison) {
    case 'maior que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      ));
      setFilters([...filters, fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) > value,
      )]);
      break;
    case 'menor que':
      setNumericFilter(fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) < value,
      ));
      setFilters([...filters, fetchedPlanets.filter(
        (planet) => parseInt(planet[column], 10) < value,
      )]);
      break;
    default:
      setNumericFilter(fetchedPlanets.filter(
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
    // armazenar o planetas filtrados em numericFilter
    const { column, comparison, value } = input;
    const newInputFilter = column + comparison + value;
    if (!inputsFilter.includes(newInputFilter)) {
      setInputsFilter([...inputsFilter, newInputFilter]);
      filterByNumericInputs();
      filterByAllNumericFilters();
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
