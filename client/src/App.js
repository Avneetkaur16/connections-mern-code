import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import PostPage from './pages/postpage/PostPage';
import Search from './pages/search/Search';
import Followers from './pages/followers/Followers';
import Followings from './pages/followings/Followings';
import Create from './pages/create/Create';
import Edit from './pages/edit/Edit';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/new' element={<Create />} />
      <Route path='/profile/:username/:id' element={<Profile />} />
      <Route path='/edit' element={<Edit />} />
      <Route path='/post/:postId' element={<PostPage />} />
      <Route path='/search' element={<Search />} />
      <Route path='/followers/:id' element={<Followers />} />
      <Route path='/followings/:id' element={<Followings />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
