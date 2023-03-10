import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import APIUsers from './pages/APIUsers';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Users from './pages/Users';
import Navbar from './components/shared/Navbar';

import './App.css';

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container_xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses/:modality" element={<Courses />} />
            <Route path="/users" element={<Users />} />
            <Route path="/api_users" element={<APIUsers />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
