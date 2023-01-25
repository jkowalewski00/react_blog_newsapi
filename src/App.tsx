import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import AboutUs from './pages/AboutUs';
import AddPost from './pages/AddPost';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import News from './pages/News';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Register from './pages/Register';
// import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/news" element={<News />} />
          <Route path="/edit-post/:id" element={<AddPost />} />
          <Route path="/about-us" element={<AboutUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

