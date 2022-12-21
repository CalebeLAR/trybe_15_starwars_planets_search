import { useState } from 'react';

export default function useInput() {
  const [inputValue, setInput] = useState('');

  const handlesChange = ({ target }) => {
    // handlesChange que server tanto para inputs de texto quanto selects
    const value = (target.value) ? (target.value) : (target.checked);
    setInput(value);
  };

  const i = {
    inputValue,
    handlesChange,
  };

  return i;
}
