import { useState } from 'react';

const initialInputs = {
  name: '',
  comparison: 'maior que',
  column: 'population',
  value: 0,
};

export default function useInput() {
  const [input, setFilter] = useState(initialInputs);

  const changeInput = ({ target }) => {
    const { value, id } = target;
    const number = parseInt(value, 10);
    if (number >= 0) {
      setFilter({ ...input, [id]: number });
    } else {
      setFilter({ ...input, [id]: value });
    }
  };

  return [input, changeInput];
}
