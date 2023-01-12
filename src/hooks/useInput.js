import { useState } from 'react';

const initialInputs = {
  name: '',
  comparison: 'maior que',
  column: 'population',
  value: '',
};

export default function useInput() {
  const [input, setFilter] = useState(initialInputs);

  const changeInput = ({ target }) => {
    const { value, id } = target;
    const number = parseInt(value, 10);
    if (id === 'value') {
      if (number >= 0) {
        setFilter({ ...input, [id]: number });
      } else {
        setFilter({ ...input, [id]: 0 });
      }
    } else {
      setFilter({ ...input, [id]: value });
    }
  };

  return [input, changeInput];
}
