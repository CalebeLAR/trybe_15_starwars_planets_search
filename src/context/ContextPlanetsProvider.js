import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput, setInput] = useInput();
  const [numFilters, setNumFilters] = useState([]);
  const [valueOptions, setValueOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  const setFilterId = (filteredPlanets) => {
    // recebe um array de planetas
    // retira a a opção selecionada da lista de valueOptions
    // monta uma string e armazena em newfilterID
    // seta um novo valor de input para atualizar o valor de column
    // retorna um objeto no formato: {ID: filteredPlanets}
    const { column, comparison, value } = input;

    const newFilterID = (column + comparison + value).replace(' ', '');
    const newColumnOptions = valueOptions.filter((valueOpt) => valueOpt !== column);
    setValueOptions(newColumnOptions);
    setInput({ ...input, column: newColumnOptions[0] });
    return { [newFilterID]: filteredPlanets };
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
    const newFilterID = (column + comparison + value).replace(' ', '');
    const filterIds = Object.keys(numFilters);
    if (!filterIds.includes(newFilterID)) {
      saveFiltersByNumericInputs();
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    input,
    numFilters,
    changeInput,
    valueOptions,
    fetchedPlanets,
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
