import { useState } from 'react';

export default function useInput() {
  const [inputValue, setInput] = useState('');

  const handlesChange = ({ target }) => {
    setInput(target.value);
  };

  const i = {
    inputValue,
    handlesChange,
  };

  return i;
}
