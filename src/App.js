import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/Users';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/create-user" element={<CreateUser/>} />
        <Route path="/edit-user/:id" element={<EditUser/>} />
        <Route path="/view-user/:id" element={<ViewUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
