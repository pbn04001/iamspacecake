import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import App from 'components/app/app'
import Home from '../views/home/home'
import Cart from '../views/cart/cart'

// Clean up when first 'real' route is implemented
const PublicRoutes = routeProps => (
  <App location={routeProps.location}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
    </Switch>
  </App>
)

export default withRouter(PublicRoutes)
