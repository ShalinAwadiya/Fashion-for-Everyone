import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './profile';
import ProfileRegisteration from './Registeration';

function App() {
  return (
       <BrowserRouter>
        <Routes>
        <Route path='/' element={<ProfileRegisteration />} />
        <Route path="/profile" element={<Profile/>}/>
        </Routes>    
       </BrowserRouter>
    
  );
}

export default App;
