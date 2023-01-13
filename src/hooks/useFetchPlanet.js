import { useState } from 'react';
import { act } from '@testing-library/react';

export default function useFetchPlanet() {
  const [fetchedPlanets, setfetchedPlanets] = useState([]);

  const removeResidentsAndSetData = (results) => {
    results.forEach((element, index, array) => {
      if (element.residents) {
        const newObj = {};
        const keys = Object.keys(element);
        keys.forEach((key) => {
          if (key !== 'residents') {
            newObj[key] = element[key];
          }
        });
        array[index] = newObj;
      }
    });
    setfetchedPlanets(results);
  };

  const fetchPlanets = () => {
    const URL = 'https://swapi.py4e.com/api/planets';
    fetch(URL)
      .then((request) => request.json())
      .then(({ results }) => act(() => removeResidentsAndSetData(results)))
      .catch(() => console.log('Erro de requisição'));
  };

  return [
    fetchedPlanets,
    fetchPlanets,
  ];
}
