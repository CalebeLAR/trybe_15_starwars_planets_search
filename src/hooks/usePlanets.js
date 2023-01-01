import { useEffect, useState } from 'react';

function usePlanets() {
  const [planets, setPlanets] = useState([]);

  const filterByAllNumericFilters = (fil, fetchedPlanets) => {
    // pega todos os arrays de filters e junta todos os planets deles em arrTot
    // pega todos os planets que se repentem em ambos os arrays de filters
    // retorna o os planets comuns a todos os filtros
    const arrTot = (fil.length) ? fil.reduce((acc, curr) => {
      acc = [...acc, ...curr];
      return acc;
    }) : [fetchedPlanets];
    const filteredByAllFilters = arrTot.reduce((acc, curr, index, array) => {
      const a = array.filter((p) => p.name === curr.name);
      if (a.length === fil.length) {
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

  return [
    planets,
    filterByAllNumericFilters,
  ];
}

export default usePlanets;
