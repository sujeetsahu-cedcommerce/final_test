import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import DrawerAppBar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Viewproducts from "./Viewproducts";
import { Provider } from "react-redux";
import { store } from "./Store";

function App() {
  return (
    <Provider store={store}>
    <div className="">
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewproducts" element={<Viewproducts />} />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
