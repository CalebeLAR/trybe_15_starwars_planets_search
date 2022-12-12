import PropTypes from 'prop-types';
import useFetchPlanet from '../hooks/useFetchPlanet';
import SearchedPlanets from './SearchedPlanets';

function SearchedPlanetsProvider({ children }) {
  const [dataRequest] = useFetchPlanet();
  console.log(dataRequest);
  return (
    <SearchedPlanets.Provider value={ { dataRequest } }>
      {children}
    </SearchedPlanets.Provider>
  );
}

SearchedPlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default SearchedPlanetsProvider;
