import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import Users from './pages/Users';
import User from './pages/User';
import Login from './pages/Login'

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  return (
    <Router>
      <Route path='/' exact>
        <Login isAuth={isAuth} setIsAuth={setIsAuth} />
      </Route>

      <ProtectedRoutes path='/users' component={Users} isAuth={isAuth} exact />
      <ProtectedRoutes path='/user' component={User} isAuth={isAuth} />
    </Router>
  );
}

export default App;
