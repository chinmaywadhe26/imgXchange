import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import GsapTransition from "./components/GsapTransition";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <>
      
      <Provider store={store}>
      <Toaster/>
        <BrowserRouter>
          <Navbar />
          <GsapTransition />
        </BrowserRouter>
      </Provider>
    </>
  );
}
