import Table from '../components/Table';
import SearchedPlanetsProvider from '../context/SearchedPlanetsProvider';

function App() {
  return (
    <main>
      <h1>Planet star warts</h1>
      <SearchedPlanetsProvider>
        <Table />
      </SearchedPlanetsProvider>
    </main>

  );
}

export default App;
