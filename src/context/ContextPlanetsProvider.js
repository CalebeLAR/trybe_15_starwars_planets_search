import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput] = useInput();
  const [numFilters, setNumFilters] = useState([]);

  const setFilterId = (filteredPlanets) => {
    // recebe um array de planetas
    // retorna um objeto com uma chava que são os valores dos inputs numéricos
    // exempor { "population1maiorque": [array(8)] }
    const { column, comparison, value } = input;

    const filterID = (column + comparison + value).replace(' ', '');
    return { [filterID]: filteredPlanets };
  };

  const saveFiltersByNumericInputs = () => {
    const { column, comparison, value } = input;

    switch (comparison) {
    case 'maior que':
      setNumFilters({
        ...numFilters,
        ...setFilterId(
          fetchedPlanets.filter((planet) => parseInt(planet[column], 10) > value),
        ),
      });
      break;
    case 'menor que':
      setNumFilters({
        ...numFilters,
        ...setFilterId(
          fetchedPlanets.filter((planet) => parseInt(planet[column], 10) < value),
        ),
      });
      break;
    default:
      setNumFilters({
        ...numFilters,
        ...setFilterId(
          fetchedPlanets.filter((planet) => parseInt(planet[column], 10) === value),
        ),
      });
    }
  };

  const onButtonClickFilter = () => {
    // verifica se o filtro numerico ja foi usado,
    // pega todas as chaves que o array numFilters possui pra verificar
    // verifica se a configuração de fitro ja está em numFilter
    // caso esteja: ele não deixa adicionar o filtro,
    // caso não esteja então ele adiciona o filtro.

    const { comparison, column, value } = input;
    const newFilter = (column + comparison + value).replace(' ', '');
    const filterIds = Object.keys(numFilters);
    if (!filterIds.includes(newFilter)) {
      saveFiltersByNumericInputs();
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    fetchedPlanets,
    input,
    changeInput,
    numFilters,
    onButtonClickFilter,
  };

  return (
    <ContextPlanets.Provider value={ value }>
      {children}
    </ContextPlanets.Provider>
  );
}

ContextPlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ContextPlanetsProvider;
