// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddDet from './components/AddDevice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />}/>
          <Route path='/signup' element={ <Register /> }/>
          <Route path='/home' element={<Home/>} />
          <Route path='/adddet' element={<AddDet/>} />
          {/* <Route path='/adddet' element={<AddDet/>} />
          <Route path='/editdet' element={<EditDet/>} />
          <Route path='/profile' element={<Profile/>} /> */} 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
