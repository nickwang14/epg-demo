import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => (
  <Link to='/'>
    <header className='Header'>
      <div className='logo'/>
      <h1>TV Guide</h1>
    </header>
  </Link>
)

export default Header
