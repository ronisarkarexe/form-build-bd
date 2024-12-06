import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FromBuilderComponent from "./components/From-Builder/from-builder-component";
import Home from "./components/home";

function App() {
  return (
    <div className="bg-slate-100 round rounded">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<FromBuilderComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
