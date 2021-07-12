import React from 'react'
import load from '../assets/tail-spin.svg'
import './Loader.scss'

const Loader = () => (
  <div className='loader'>
    <img src={load}/>
  </div>
)

export default Loader
