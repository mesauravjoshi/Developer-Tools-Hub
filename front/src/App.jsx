import './App.css'
import Home from './components/Home';
import SignUp from './components/Auth/SignUp';
import Get from './components/Get';
import Post from './components/Post/Post';
import Put from './components/Put';
import Patch from './components/Patch';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/get" element={<Get />} />
          <Route path="/post" element={<Post />} />
          <Route path="/put" element={<Put />} />
          <Route path="/patch" element={<Patch />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
