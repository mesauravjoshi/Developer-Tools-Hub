import Home from '@/components/Home';
import SignUp from '@/components/Auth/SignUp';
import LogIn from '@/components/Auth/LogIn';
import Request from '@/pages/Request';
// import Post from '@/components/Post/Post';
import MainLayout from '@/layout/MainLayout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function Index() {
  return (
    <Router>
      <Routes>

        {/* pages without layout */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        {/* pages WITH layout */}
        <Route element={<MainLayout />}>
          <Route path="/request" element={<Request />} />
          {/* <Route path="/post" element={<Post />} /> */}
        </Route>

        <Route path="*" element={<div>Not found</div>} />

      </Routes>
    </Router>
  );
}

export default Index;