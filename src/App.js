import { Route, Routes } from "react-router-dom";
import Index from './views/index';
import Other from './views/other';
import Login from './Login';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/other" element={<Other />}></Route>
      <Route path="/Login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
