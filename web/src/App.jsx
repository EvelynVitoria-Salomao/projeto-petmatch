import "./App.css";
// importa os elementos de roteamento do React
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// imports das pagina
import Home from "./pages/Home";
import Login from "./pages/Login";
import OnResgister from "./pages/OnResgister";
import PetList from "./pages/PetList";


function App() {
  return (
    // aqui será só navagação e coisas gerais
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='onResgister' element={<OnResgister/>}/>
      <Route path='petList' element={<PetList/>}/>
    </Routes>
   </BrowserRouter>


  );
}

export default App;


