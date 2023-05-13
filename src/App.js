import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from './pages/Logout'
import ContextProvider from "./contexts/Context";
import ProtectedRoutes from "./PrivateRoute/Protected";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Otp from "./pages/Otp";

function App() {



  return (
    <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/user" element={<ProtectedRoutes isProtected={false}/>} >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='otp' element={<Otp />} />
        </Route>
        <Route path="/user" element={<ProtectedRoutes isProtected={true}/>} >
          <Route path='logout' element={<Logout />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
