import { useState } from 'react';

export default function useInput() {
  const [inputValue, setInput] = useState('');

  const handlesChange = ({ target }) => {
    // handlesChange que server tanto para inputs de texto quanto selects
    console.log(target.value)
    setInput(target.value);
  };

  const i = {
    inputValue,
    handlesChange,
  };

  return i;
}
