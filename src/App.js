import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Homepage from './Pages/Homepage';
import Forgetpassword from './Pages/Forgetpassword';
import Resetpassword from './Pages/Resetpassword';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/forgetpassword' element={<Forgetpassword/>}/>
        <Route exact path='/users/validate/:id/:token' element={<Resetpassword/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
