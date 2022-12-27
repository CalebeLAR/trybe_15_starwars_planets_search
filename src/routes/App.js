import Table from '../components/Table';
import '../index.css';
import FormPlanet from '../components/FormPlanet';
import ContextPlanetsProvider from '../context/ContextPlanetsProvider';

function App() {
  return (
    <main>
      <ContextPlanetsProvider>
        <FormPlanet />
        <Table />
      </ContextPlanetsProvider>
    </main>

  );
}

export default App;
