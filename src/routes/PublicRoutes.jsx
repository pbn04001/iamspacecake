import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import App from 'components/app/app'
import Home from '../views/home/home'
import Cart from '../views/cart/cart'
import Shop from '../views/shop/shop'
import Product from '../views/product/product'
import OrderComplete from '../views/cart/orderComplete'
import Contact from '../views/contact/contact'

// Clean up when first 'real' route is implemented
const PublicRoutes = routeProps => (
  <App location={routeProps.location}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/shop/:category" component={Shop} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/order-complete" component={OrderComplete} />
      <Route exact path="/contact" component={Contact} />
    </Switch>
  </App>
)

export default withRouter(PublicRoutes)
