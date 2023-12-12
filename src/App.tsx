// Provider
import { ToastContextProvider } from 'context/toast';

// Component
import Layout from '@components/layout/Layout';

function App() {
  return (
    <ToastContextProvider>
      <Layout />
    </ToastContextProvider>
  );
}

export default App;
