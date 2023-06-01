import Layout from "./layout";
import WebXR from "./views/webxr";
import Join from "./views/join";

import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/conference" element={<Join />}></Route>
        <Route path="/webxr" element={<WebXR />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
