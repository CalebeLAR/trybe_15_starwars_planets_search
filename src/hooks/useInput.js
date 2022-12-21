import { useState } from 'react';

export default function useInput(initialValue) {
  const [inputValue, setInput] = useState(initialValue);

  const handlesChange = ({ target }) => {
    setInput(target.value);
  };

  const i = {
    inputValue,
    handlesChange,
  };

  return i;
}
