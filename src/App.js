import Layout from "./layout";
import WebXR from "./views/webxr";
import Join from "./views/join";

import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext();

function App() {

  const [data, setData] = useState({});
  const handleDataChange = data => {
    console.log(data);
    setData(data);
  };

  return (
    <MyContext.Provider value={{ data, handleDataChange }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/conference" element={<Join data={data}/>}></Route>
          <Route path="/webxr" element={<WebXR data={data}/>}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
