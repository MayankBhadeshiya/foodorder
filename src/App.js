import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './components/Base/Base';
import Signup from './components/Signup/Signup';
import Adminbase from './components/Adminbase/Adminbase';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Base} />
        <Route path='/SignUp' Component={Signup} />
        <Route path='/Admin' Component={Adminbase} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
