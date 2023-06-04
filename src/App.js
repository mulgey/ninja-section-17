// styles
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import './App.css'

// pages and components
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { authHazırKıta, user } = useAuthContext()

  return (
    <div className="App">
      {authHazırKıta &&
        (<BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Switch>
              <Route path='/create'>
                {!user && <Redirect to='/login' />}
                {user && <Create />}
              </Route>

              <Route exact path='/'>
                {/* kullanıcı varsa Home gösterilir, yoksa Giriş ekranına */}
                {!user && <Redirect to='/login' />}
                {user && <Dashboard />}
              </Route>

              <Route path='/login'>
                {/* kullanıcı yoksa Login gösterilir, varsa Home ekranına */}
                {/* kullanıcı giriş yaptığında Home'a geçmesini sağlar */}
                {user && <Redirect to='/' />}
                {!user && <Login/>}
              </Route>

              <Route path='/projects/:id'>
                {user && <Project />}
                {!user && <Redirect to='/' />}
              </Route>

              <Route path='/signup'>
                {user && <Redirect to='/' />}
                {!user && <Signup/>}
              </Route>

              <Route path='*'>
                <Redirect to='/'/>
              </Route>

            </Switch>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>)
      }
    </div>
  );
}

export default App
