import Table from '../components/Table';
import '../index.css';
import FormPlanet from '../components/FormPlanet';
import SearchedPlanetsProvider from '../context/SearchedPlanetsProvider';

function App() {
  return (
    <main>
      <SearchedPlanetsProvider>
        <FormPlanet />
        <Table />
      </SearchedPlanetsProvider>
    </main>

  );
}

export default App;
