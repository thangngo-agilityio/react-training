// Provider
import { ModalContextProvider } from "context/modal";
import { ToastContextProvider } from "context/toast";
// Component
import Layout from "@components/layout/Layout";
import MainPage from "@components/main/Main";

function App() {

  return (
    <ModalContextProvider>
      <ToastContextProvider>
        <Layout>
          <MainPage />
        </Layout>
      </ToastContextProvider>
    </ModalContextProvider>
  );
}

export default App;
