import "./App.css";
// importa os elementos de roteamento do React
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// imports das pagina
import Home from "./pages/Home";
import Login from "./pages/Login";

import PetList from "./pages/PetList";
import Password from "./pages/recoverPassword";
import NewPassword from "./pages/newPassword";
import Checked from "./pages/checked";


function App() {
  return (
    // aqui será só navagação e coisas gerais
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
    
      <Route path='/PetList' element={<PetList/>}/>
      <Route path='/Login/recoverPassword' element={<Password/>}/>
      <Route path='/Login/newPassword' element={<NewPassword/>}/>
      <Route path='/Login/checked' element={<Checked/>}/>
     
    </Routes>
   </BrowserRouter>


  );
}

export default App;


