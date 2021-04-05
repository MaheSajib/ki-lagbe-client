import { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './components/Admin/Admin';
import AddProducts from './components/AddProducts/AddProducts';
import Order from './components/Order/Order';
import ManageProduct from './components/ManageProduct/ManageProduct';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [checkOut, setCheckOut] = useState([]);

  return (
    <UserContext.Provider value={{ userDetail: [loggedInUser, setLoggedInUser], checkOutDetail: [checkOut, setCheckOut] }}>
      <Router>

        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/order">
            <Order></Order>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/addProducts">
            <AddProducts></AddProducts>
          </PrivateRoute>
          <PrivateRoute path="/manageProducts">
            <ManageProduct></ManageProduct>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
