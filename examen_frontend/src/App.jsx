import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import APIUsers from './pages/APIUsers';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Users from './pages/Users';
import CreateUser from './pages/users/CreateUser';
import EditUser from './pages/users/EditUser';
import DeleteUser from './pages/users/DeleteUser';

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
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:uid" element={<EditUser />} />
            <Route path="/users/Delete/:uid" element={<DeleteUser />} />
            <Route path="/api_users" element={<APIUsers />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}
