import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history, PrivateRoute, ScrollToTop } from './utilities';
import { Navbar, Footer, Notfound, Loader } from './components/common';
import { Homepage } from './components/presentational';
import {
  Register,
  Login,
  Profile,
  Shop,
  SingleProduct,
  Checkout,
  Pay,
} from './components/container';

function App() {
  return (
    <Router history={history}>
      <React.Fragment>
        <ScrollToTop>
          <Loader />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/customer" component={Profile} />
            <Route path="/shop" component={Shop} />
            <Route path="/product/:id" component={SingleProduct} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/pay" component={Pay} />
            <Route component={Notfound} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </React.Fragment>
    </Router>
  );
}

export default App;
