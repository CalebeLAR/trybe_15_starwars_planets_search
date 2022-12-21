import { useState } from 'react';

export default function useInput() {
  const [inputValue, setInputName] = useState('');

  const handlesChange = ({ target }) => {
    setInputName(target.value);
  };

  return [
    inputValue,
    handlesChange,
  ];
}
