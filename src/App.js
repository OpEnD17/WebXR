import Layout from "./layout";
import AframeTest from "./views/aframe";
import Join from "./views/join";
import Chat from "./views/socket";

import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/conference" element={<Join />}></Route>
        <Route path="/vr" element={<AframeTest />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
