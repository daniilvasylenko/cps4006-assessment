import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import "./App.css"

import Home from "./pages/Home";
import Modes from "./pages/Modes";
import Estimator from "./pages/Estimator";

function App() {
  return(
    <BrowserRouter>
     <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/modes">Modes</Link>
      <Link to="/estimator">Estimator</Link>
     </nav>

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modes" element={<Modes />} />
      <Route path="/estimator" element={<Estimator />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
