import { ModalContextProvider } from "context/modal";
import Layout from "@components/layout/Layout";
import MainPage from "@components/main/Main";

function App() {

  return (
    <ModalContextProvider>
      <Layout>
        <MainPage />
      </Layout>
    </ModalContextProvider>
  );
}

export default App;
