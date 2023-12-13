// Provider
import { ToastContextProvider } from 'context/toast';
import { Layout } from './components';

// Component

function App() {
  return (
    <ToastContextProvider>
      <Layout />
    </ToastContextProvider>
  );
}

export default App;
