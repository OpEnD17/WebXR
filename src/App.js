import Layout from "./layout";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Join from "./Views/join";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout />
        }></Route>
        <Route path="/conference" element={<Join />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
