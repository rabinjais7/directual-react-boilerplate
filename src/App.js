import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
  useHistory, useLocation,
} from 'react-router-dom'

import { MainMenu } from './components/menu/menu'
import { ProvideAuth, useAuth, authContext } from './auth'

import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import PrivatePage from './pages/PrivatePage'
import Websocket from './pages/Websocket'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/login'

function PrivateRoute({ children, hasRole, ...rest }) {
  const auth = useAuth();
  return (
      <Route
          {...rest}
          render={({ location }) =>
              auth.isAutorised() && auth.hasRole(hasRole) ? (
                  children
              ) : auth.isAutorised() && !auth.hasRole(hasRole) ? <div>Access denied</div> : (
                  <Redirect
                      to={{
                          pathname: '/login',
                          state: { from: location }
                      }}
                  />
              )
          }
      />
  )
}

// This is for pages like your.app/books/the-bible, wthere 'the-bible' in nan Object ID
//
// const Child = ({ match }) => {
//   return (
//   <div>Object ID: {match.params.id}</div>
//   )
// }

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <MainMenu />
        <Switch>

         {/* Public pages */}
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            watched
          </Route>
          <Route exact path="/towatch">
            Movies to Watch
          </Route>
          <Route exact path="/add">
            Recommend me movie
          </Route>
          {/* <PrivateRoute path="/private">
            <PrivatePage />
          </PrivateRoute>
          <PrivateRoute path="/websocket">
            <Websocket />
          </PrivateRoute>

  
          <PrivateRoute path="/admin" hasRole={'admin'}>
            <AdminPage />
          </PrivateRoute> */}
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
