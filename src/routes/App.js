import Table from '../components/Table';
import '../index.css';
import FormPlanet from '../components/FormPlanet';
import ContextPlanetsProvider from '../context/ContextPlanetsProvider';
import ContextFiltersProvider from '../context/ContextFiltersProvider';

function App() {
  return (
    <main>
      <ContextPlanetsProvider>
        <ContextFiltersProvider>
          <FormPlanet />
          <Table />
        </ContextFiltersProvider>
      </ContextPlanetsProvider>
    </main>

  );
}

export default App;
