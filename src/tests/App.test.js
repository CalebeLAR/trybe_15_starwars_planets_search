import { getByRole, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import App from '../routes/App';
import results from './request';

describe('ao iniciar a plicação.', ()=> {
  afterEach(() => jest.clearAllMocks());
  test('deve aparecer uma mensagem de loading antes de carregar os planetas da tabela', ()=> {
    render(<App/>);
    expect(screen.getByText('Loading...')).toBeVisible();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('deve ser feita uma requisição para a API de planetas do starWars', async ()=> {
    // mock do fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(results),
    })

    const URL = 'https://swapi.py4e.com/api/planets'
    render(<App/>);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(URL);
  });

  test('apos a requisição a tabela tem que ser abastecida com 10 planetas', async ()=> {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(results),
    })
    render(<App/>);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    const table  = screen.getByRole('table');
    const cells = table.getElementsByTagName('td').length
    expect(cells).toBe(130)

  });
  test('no topo de cada coluna da tabela deve ter uma caracteristica de um planeta, ao todo deve ser 13 caracteristicas', async () => {
    const featuresList = [
      'Name','Rotation','Orbital_Period','Diameter',
      'Climate','Gravity','Terrain','Surface_Water',
      'Population','Films','Created','Edited','url',
    ]

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(results),
    })
    render(<App/>);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    const table  = screen.getByRole('table');
    const coluns = table.getElementsByTagName('th');
    [...coluns].forEach((features)=>{
      expect(featuresList).toContain(features.innerHTML);
    })
  });
})

describe('search barr', ()=> {
  beforeEach(async ()=>{
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(results),
  })
    render(<App/>);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

  })
  test('deve ser rederizada uma search barr para pesquisar os planetas pelo nome', ()=> {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('name-filter')).toBeVisible();
  });
  test('ao digitar na search barr, os planetas precisam ser filtrados instantaneamente na tabela a cada letra digitada', () => {
    const search_o = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    const search_oo = ['Naboo', 'Tatooine'];
    const getPlanetsFiltereds = () => screen.getAllByTestId("name-planet");
    let planets = [];


    const searchBarr = screen.getByTestId('name-filter');
    userEvent.type(searchBarr, 'o'); // searhaBarr com 'o'
    planets = getPlanetsFiltereds();
    expect(planets).toHaveLength(7);
  
    [...planets].forEach((features)=>{
      expect(search_o).toContain(features.innerHTML);
    })

    userEvent.type(searchBarr, 'o'); // searhaBarr com 'o'
    planets = getPlanetsFiltereds();
    expect(planets).toHaveLength(2);
    planets = screen.getAllByTestId("name-planet");
    [...planets].forEach((features)=>{
      expect(search_o).toContain(features.innerHTML);
    })
  });
  test('caso não seja encontrado nem um planeta, a tabela tem que ficar vazia', ()=>{
    const searchBarr = screen.getByTestId('name-filter');

    userEvent.type(searchBarr, 'eu não sou um planeta. juro!'); // searhaBarr com 'o'
    const planets = screen.queryAllByAltText("name-planet");
    expect(planets).toHaveLength(0);
  
  });
})

describe('filtros numéricos', ()=> {
  test.todo('deve haver tres inputs para filtrar os planetas. cada um com o texto: coluna, comparação e valor.');
  test.todo('ao clicar no botão de filtro, a tabela deve exibir so os planetas que satisfazem o filtro');
  test.todo('o filtro por nome deve continuar nos planetas filtrados');
});
