import { useState } from 'react';

export default function useFetchPlanet() {
  const [fetchedPlanets, setfetchedPlanets] = useState([]);

  const removeResidentsAndSetData = (results) => {
    results.forEach((element, index, array) => {
      if (element.residents) {
        // monta um novo objeto
        const newObj = {};
        const keys = Object.keys(element);
        keys.forEach((key) => {
          if (key !== 'residents') {
            newObj[key] = element[key];
          }
        });
        // la no array results ele troca o elemento que está com o objeto com a chave residents
        // pelo novo objeto sem essa chave
        array[index] = newObj;
      }
    });
    setfetchedPlanets(results);
  };

  return {
    fetchedPlanets,
    removeResidentsAndSetData,
  };
}
