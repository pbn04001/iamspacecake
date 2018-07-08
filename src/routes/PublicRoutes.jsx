import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import App from 'components/app/app'
import Home from '../views/home/home'
import Cart from '../views/cart/cart'
import Checkout from '../views/checkout/checkout'
// import { Login, LoginSuccess } from '../views/login'

// Clean up when first 'real' route is implemented
const PublicRoutes = routeProps => (
  <App location={routeProps.location}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/checkout" component={Checkout} />
      {/* // Login is currently disabled as we don't support user accounts currently
      <Route exact path="/login" component={Login} />
      <Route exact path="/login/success" component={LoginSuccess} /> */}
    </Switch>
  </App>
)

export default withRouter(PublicRoutes)
