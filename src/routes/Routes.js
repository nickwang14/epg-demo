import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../components/Home'

const Routes = () => (
  <Switch>
    <Route path='/'>
      <Home/>
    </Route>
  </Switch>
)

export default Routes
