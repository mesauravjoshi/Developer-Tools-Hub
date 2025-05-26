import './App.css'
import Home from './components/Home';
import SignUp from './components/Auth/SignUp';
import Get from './components/Get';
import Post from './components/Post';
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
        </Routes>
      </Router>
    </>
  )
}

export default App
