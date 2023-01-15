import { useState } from 'react';

const initialInputs = {
  name: '',
  comparison: 'maior que',
  column: 'population',
  value: 0,
  order: { columnSort: 'population', sort: 'ASC' },
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

  const changeSort = ({ target }) => {
    const { id, value } = target;
    const { order: { columnSort, sort } } = input;
    console.log(columnSort);
    if (id === 'columnSortInputDesc') {
      setInput({ ...input, order: { columnSort, sort: value } });
    }
    if (id === 'columnSortInputAsc') {
      setInput({ ...input, order: { columnSort, sort: value } });
    }
    if (id === 'columnSort') {
      setInput({ ...input, order: { columnSort: value, sort } });
    }
  };

  return [input, changeInput, setInput, changeSort];
}
