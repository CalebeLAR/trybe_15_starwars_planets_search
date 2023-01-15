import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

const THREE = 3;
function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();
  const [input, changeInput, setInput, changeSort] = useInput();
  const [numFilters, setNumFilters] = useState([]);
  const [sortFilter, setSortFilter] = useState(['population', 'ASC']);
  const allColumns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [valueOptions, setValueOptions] = useState(allColumns);

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

  const restoreColumns = (f) => {
    const filterInitials = f.slice(0, THREE);
    allColumns.forEach((column, i) => {
      if (column.includes(filterInitials)) {
        setValueOptions([...valueOptions, allColumns[i]]);
      }
    });
  };

  const removeFilter = (f) => {
    if (f === 'all') {
      setNumFilters([]);
      setValueOptions(allColumns);
    } else {
      const arrEntries = Object.entries(numFilters);
      const newArr = arrEntries.reduce((acc, curr) => {
        if (curr[0] !== f) {
          return { ...acc, [curr[0]]: curr[1] };
        }
        return acc;
      }, {});
      setNumFilters(newArr);
      restoreColumns(f);
    }
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
    // pega todas as chaves que o array numFilters possui pra
    // verificar se a configuração de fitro ja está em numFilter
    // caso esteja: ele não deixa adicionar o filtro,
    // caso não esteja então ele adiciona o filtro.

    const { comparison, column, value } = input;
    const newFilterID = (column + comparison + value).replace(' ', '');
    const filterIds = Object.keys(numFilters);
    if (!filterIds.includes(newFilterID)) {
      saveFiltersByNumericInputs();
    }
  };

  const onButtonSortFilter = () => {
    const { order: { columnSort, sort } } = input;
    setSortFilter([columnSort, sort]);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const value = {
    input,
    changeSort,
    numFilters,
    allColumns,
    sortFilter,
    changeInput,
    valueOptions,
    removeFilter,
    fetchedPlanets,
    onButtonClickFilter,
    onButtonSortFilter,
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
