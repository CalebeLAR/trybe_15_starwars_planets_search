import { useState } from 'react';

export default function useInput(initialValue) {
  const [inputValue, setInput] = useState(initialValue);

  const handlesChange = ({ target }) => {
    const { value } = target;

    // se o "value" for uma string de um numero, ele tranforma em numero
    const number = parseInt(value, 10);

    // caso o numero seja maior que 0 ele seta o estado como um valor numérico
    if (number >= 0) {
      setInput(number);
    }

    // caso "value" não seja numérico ele apenas seta "value"
    setInput(value);
  };

  const i = {
    inputValue,
    handlesChange,
  };

  return i;
}
