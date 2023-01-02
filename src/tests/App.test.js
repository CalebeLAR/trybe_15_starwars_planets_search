import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../routes/App';

describe('App.js testes para ver se os elementos estão aparecendo na tela.\n',() => {
  beforeEach(() => {
    render(<App/>);
    waitForElementToBeRemoved(()=> screen.getByText('Loading...'))
  });
  // test.only('only', ()=> {});
  test.todo('01) verifica se foi feita uma requisição para a API starWarsPlanets')
  test('02) deve haver um titulo com o texto "SEARCH PLANET"', () => {
    expect(screen.getByText("SEARCH PLANET")).toBeInTheDocument();
  });
  test.todo('verifica se ao digitar na barra de pesquisa os planetas são filtrados pelo nome');
  test('03) deve haver um input para pesquisar o nome dos planetas', () => {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  });
  test('1) deve haver um input com o texto "Coluna"', () => {
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
  });
  test('1) deve haver um input com o texto "Operador"', () => {
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
  });
  test('1) deve haver um input com o texto "Valor"', () => {
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
  });
  test('1) deve haver um botão com o texto "Filtrar"', () => {
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
  });
  test('1) tabela deve possuir 13 colunas com as informações de cada planeta\n', () => {
    const table = screen.getByRole('table');
    const columns = table.getElementsByTagName('th');
    const arr = [
      'Name','Rotation','Orbital_Period', 'Diameter','Climate','Gravity','Terrain','Surface_Water','Population','Films','Created','Edited','url'
    ];
    [...columns].forEach((element)=>{
      const isIncludes = arr.includes(element.textContent);
      expect(isIncludes).toBeTruthy();
    })
    expect(columns).toHaveLength(13);
  });
})