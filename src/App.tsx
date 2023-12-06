// Provider
import { ToastContextProvider } from "context/toast";
// Component
import Layout from "@components/layout/Layout";
import MainPage from "@components/main/Main";

function App() {

  return (
    <ToastContextProvider>
      <Layout>
        <MainPage />
      </Layout>
    </ToastContextProvider>
  );
}

export default App;
