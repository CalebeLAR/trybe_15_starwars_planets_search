import PropTypes from 'prop-types';
import { useEffect } from 'react';
import useFetchPlanet from '../hooks/useFetchPlanet';
import ContextPlanets from './ContextPlanets';

function ContextPlanetsProvider({ children }) {
  const [fetchedPlanets, fetchPlanets] = useFetchPlanet();

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  const value = {
    fetchedPlanets,
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
