import { getByRole, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import App from '../routes/App';
import results from './request';
import checkTheSelectOptions from './helper';

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
    const getPlanetsFiltereds = () => screen.getAllByTestId("planet-name");
    let planets = [];


    const searchBarr = screen.getByTestId('name-filter');
    userEvent.type(searchBarr, 'o'); // searhaBarr com 'o'
    planets = getPlanetsFiltereds();
    expect(planets).toHaveLength(7);
  
    [...planets].forEach((features)=>{
      expect(search_o).toContain(features.innerHTML);
    })

    userEvent.type(searchBarr, 'o'); // searhaBarr com 'oo'
    planets = getPlanetsFiltereds();
    expect(planets).toHaveLength(2);
    [...planets].forEach((features)=>{
      expect(search_oo).toContain(features.innerHTML);
    })
  });
  test('caso não seja encontrado nem um planeta, a tabela tem que ficar vazia', ()=>{
    const searchBarr = screen.getByTestId('name-filter');

    userEvent.type(searchBarr, 'eu não sou um planeta. juro!');
    const planets = screen.queryAllByTestId("planet-name");
    expect(planets).toHaveLength(0);
  
  });
})

describe('filtros numéricos', ()=> {

  const btnFilter = () => screen.getByTestId('button-filter');
  const columnInput = () => screen.getByTestId('column-filter');
  const comparisonInput = () => screen.getByTestId('comparison-filter');
  const valuInput = () => screen.getByTestId('value-filter');
  const filteredPlanets = () => screen.getAllByTestId('planet-name');

  beforeEach(async ()=>{
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(results),
    })
      render(<App/>);
      await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
  
    });

  test('deve haver tres inputs para filtrar os planetas: coluna, comparação e valor.', () => {
    const comparisonOptions = [ 'maior que', 'menor que', 'igual a' ]
    const columnOptions = ['population','orbital_period','diameter','rotation_period','surface_water'];
  
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
    expect(screen.getByTestId('comparison-filter')).toBeVisible()
    checkTheSelectOptions('comparison-filter', comparisonOptions)
    
    expect(screen.getByTestId('column-filter')).toBeInTheDocument()
    expect(screen.getByTestId('column-filter')).toBeVisible()
    checkTheSelectOptions('column-filter', columnOptions)

    expect(screen.getByTestId('button-filter')).toBeInTheDocument()
    expect(screen.getByTestId('button-filter')).toBeVisible()
    expect(screen.getByTestId('button-filter')).toBeEnabled()

    
    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument()
    expect(valueInput).toBeVisible()

    userEvent.clear(screen.getByTestId('value-filter'))
    userEvent.type(valueInput, "1000");
    expect(screen.getByTestId('value-filter').value).toBe("1000");
    userEvent.clear(screen.getByTestId('value-filter'))
    expect(screen.getByTestId('value-filter').value).toBe("");
    userEvent.type(valueInput, "-1");
    expect(screen.getByTestId('value-filter').value).toBe("");


  });
  test('ao clicar no botão de filtro, a tabela deve exibir so os planetas que satisfazem o filtro', () => {

    userEvent.selectOptions(columnInput(),'population');
    userEvent.selectOptions(comparisonInput(),'maior que');
    userEvent.type(valuInput(),'10000000');
    userEvent.click(btnFilter());

    const expectesPlanets =  ['Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant' ];

    filteredPlanets().forEach((planet, index)=> {
      expect(planet.innerHTML).toBe(expectesPlanets[index])
    })
    expect(filteredPlanets()).toHaveLength(5);
  });
  test('podem ser aplicados multiplos filtros, e cada um deles deve aparecer na tela', async ()=> {
    userEvent.selectOptions(columnInput(),'population');
    userEvent.selectOptions(comparisonInput(),'menor que');
    userEvent.type(valuInput(),'10000000');
    userEvent.click(btnFilter());

    await screen.findByText('populationmenorque10000000')

    let expectesPlanets =  ['Yavin IV', 'Tatooine', 'Bespin'];
    
    filteredPlanets().forEach((planet, index)=> {
      expect(planet.innerHTML).toBe(expectesPlanets[index])
    })
    expect(filteredPlanets()).toHaveLength(3);
    userEvent.clear(valuInput());

    userEvent.selectOptions(columnInput(),'orbital_period');
    userEvent.selectOptions(comparisonInput(),'igual a');
    userEvent.type(valuInput(),'304');
    userEvent.click(btnFilter());
    
    await screen.findByText('orbital_periodiguala304')
    expectesPlanets =  ['Tatooine'];

    filteredPlanets().forEach((planet, index)=> {
      expect(planet.innerHTML).toBe(expectesPlanets[index])
    })
    expect(filteredPlanets()).toHaveLength(1);



  })

  test.todo('o filtro por nome deve continuar nos planetas filtrados');
});
