import PropTypes from 'prop-types';
import ContextFilters from './ContextFilters';

function ContextFiltersProvider({ children }) {
  return (
    <ContextFilters.Provider>
      {children}
    </ContextFilters.Provider>
  );
}

ContextFiltersProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ContextFiltersProvider;
