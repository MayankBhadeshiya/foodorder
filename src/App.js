import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Base from './components/Base/Base';
import Signup from './components/Signup/Signup';
import Adminbase from './components/Adminbase/Adminbase';
import AddMeal from './components/admin/AddMeal';
import ShowOrder from './components/admin/ShowOrder';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Base} />
        <Route path='/SignUp' Component={Signup} />
        <Route path='/Admin' Component={Adminbase} >
          <Route path='/Admin/AddMeal' Component={AddMeal} />
          <Route path='/Admin/ShowOrder' Component={ShowOrder} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
