import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../routes/App';
import userEvent from '@testing-library/user-event';

describe('ao iniciar a plicação.', ()=> {
  test.todo('deve ser renderizada uma tabela só com uma linha contendo 13 colunas')
  test.todo('cada linha da tabela deve ter uma caracteristica de um planeta')
  test.todo('deve aparecer uma mensagen de loading antes de carregar os planetas da tabela')
  test.todo('deve ser feita uma requisição para a API de planetas do starWars')
  test.todo('apos a requisição a tabela tem que ser abastecida com os planetas')
})

describe('search barr', ()=> {
  test.todo('deve ser rederizada uma search barr para pesquisar os planetas pelo nome');
  test.todo('ao digitar na search barr, os planetas precisam ser filtrados instantaneamente na tabela');
  test.todo('caso não seja encontrado nem um planeta, a tabela tem que ficar vazia');
})

describe('filtros numéricos', ()=> {
  test.todo('deve haver tres inputs para filtrar os planetas. cada um com o texto: coluna, comparação e valor.');
  test.todo('ao clicar no botão de filtro, a tabela deve filtrar pelos inputs de filtro');
  test.todo('o filtro por nome deve continuar nos planetas filtrados');
});
