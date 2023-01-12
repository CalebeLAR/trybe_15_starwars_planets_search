import { useState } from 'react';

const initialInputs = {
  name: '',
  comparison: 'maior que',
  column: 'population',
  value: 0,
};

export default function useInput() {
  const [input, setInput] = useState(initialInputs);

  const changeInput = ({ target }) => {
    const { value, id } = target;
    const number = parseInt(value, 10);
    if (id === 'value') {
      if (number >= 0) {
        setInput({ ...input, [id]: number });
      } else {
        setInput({ ...input, [id]: '' });
      }
    } else {
      setInput({ ...input, [id]: value });
    }
  };

  return [input, changeInput];
}
