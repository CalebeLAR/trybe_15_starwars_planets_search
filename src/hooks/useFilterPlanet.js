import { useState } from 'react';

export default function useFilterPlanet(fetchedPlanets) {
  const [filteredPlanents, setFilteredPlanents] = useState(fetchedPlanets);

  const handlesInputChange = ({ target }) => {
    const p = fetchedPlanets.filter((planet) => planet.name.includes(target));
    if (p) {
      setFilteredPlanents(p);
    } else {
      setFilteredPlanents(fetchedPlanets);
    }
  };

  return [
    filteredPlanents,
    handlesInputChange,
    // setFilteredPlanents,
  ];
}
