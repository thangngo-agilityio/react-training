import Header from "@components/header/Header";
import MainPage from "@components/main/Main";
import { ModalContextProvider } from "context/modal";

function App() {

  return (
    <ModalContextProvider>
      <div className="container ">
        <div className="wrapper">
          <Header />
          <MainPage />
        </div>
      </div>
    </ModalContextProvider>
  );
}

export default App;
