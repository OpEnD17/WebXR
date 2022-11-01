import Layout from "./layout";
import AframeTest from "./views/aframe";
import Join from "./views/join";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/conference" element={<Join />}></Route>
        <Route path="/aframe" element={<AframeTest />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
