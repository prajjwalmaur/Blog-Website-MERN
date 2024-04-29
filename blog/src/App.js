import "./App.css";
import Navbar from './Navbar';
import Home from './Home';
import Post from './Post';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
