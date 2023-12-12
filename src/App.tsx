// Provider
import { ToastContextProvider } from 'context/toast';

// Component
import Layout from '@components/Layout/Layout';

function App() {
  return (
    <ToastContextProvider>
      <Layout />
    </ToastContextProvider>
  );
}

export default App;
