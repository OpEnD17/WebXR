import Layout from "./layout";
import WebXR from "./views/webxr";
import Join from "./views/join";
import Chat from "./views/socket";

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('http://localhost:8080/api/token?name=test');
  //     console.log(result.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <MyContext.Provider value={{ data, handleDataChange }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/conference" element={<Join data={data}/>}></Route>
          <Route path="/webxr" element={<WebXR />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
