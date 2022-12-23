import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogInLogOutButton } from '../loginLogout/loginLogoutButton'
import { useAuth } from '../../auth'
import { Link } from 'react-router-dom'

import './menu.css'


export function MainMenu() {
  const authContext = useAuth();
  return (
    <ul className="main-menu">
      <li className='logo'>MyMovieList</li>
      <li>
        <NavLink exact to="/">Watched</NavLink>
      </li>
      <li>
        <NavLink exact to="/towatch">To watch</NavLink>
      </li>
      <li>
        <NavLink exact to="/add">Recommend</NavLink>
      </li>

      {/* JSX visible for authorised users only */}
      {authContext.isAutorised() && <li>
        <NavLink exact to="/private">Private Page</NavLink>
      </li>}
      {authContext.isAutorised() && <li>
        <NavLink exact to="/websocket">Websocket Page</NavLink>
      </li>}

      {/* JSX visible for users, who have role == 'admin'. You can apply any other value here */}
      {authContext.hasRole('admin') && <li>
        <NavLink exact to="/admin">Admin Page</NavLink>
      </li>}
      <li className="rihgt-top">
        {!authContext.isAutorised() &&
        <Link to ="/register"><button>Register</button></Link> }
        <LogInLogOutButton />
      </li>
    </ul>
  )
}
