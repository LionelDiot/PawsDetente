import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./components/Home/Home";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Notify /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
