import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Homepage from './Pages/Homepage';
import Forgetpassword from './Pages/Forgetpassword';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/forgetpassword' element={<Forgetpassword/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
