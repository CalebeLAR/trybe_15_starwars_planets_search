import { useState } from 'react';

export default function useInputName() {
  const [inputName, setInputName] = useState('');

  const handlesChange = ({ target }) => {
    setInputName(target.value);
  };

  return [
    inputName,
    handlesChange,
  ];
}
