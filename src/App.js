import { Route, Routes } from "react-router-dom";
import Index from "./views/index";
import Other from "./views/other";
import Login from "./Login";
import Nav from "./component/nav";
import Footer from "./layout/Footer";
import Vr from "./views/vr";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/other" element={<Other />}></Route>
        <Route path="/vr" element={<Vr />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}

export default App;
