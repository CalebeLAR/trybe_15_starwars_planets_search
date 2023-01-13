import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const checkTheSelectOptions = (select_TestId, listOptions) => {
  // recebe doi parametros, um dataTestId de um elemento Select e uma lista 
  // com o nome de cada opção do select. 
  // compara se todas as opções do select estão na lista de opções

  const select = screen.getByTestId(select_TestId)
  const options = select.getElementsByTagName('option');
  const numOptions = [...options].reduce((acc, option)=> {
    const {value} = option;
    expect(listOptions).toContain(value);

    return acc = [...acc, value];
  }, []);

  expect(numOptions).toHaveLength(listOptions.length);
}

export default checkTheSelectOptions;