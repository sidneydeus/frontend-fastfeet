import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Logout from '~/pages/Logout';

import DeliveryProblems from '~/pages/DeliveryProblems';

import Recipients from '~/pages/Recipients';
import RecipientsEdit from '~/pages/Recipients/Edit';

import Deliveries from '~/pages/Deliveries';
import DeliveriesEdit from '~/pages/Deliveries/Edit';
import DeliveriesRegister from '~/pages/Deliveries/Register';

import Deliverymen from '~/pages/Deliverymen';
import DeliverymanEdit from '~/pages/Deliverymen/Edit';
import DeliverymanRegister from '~/pages/Deliverymen/Register';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/logout" exact component={Logout} isPrivate />
      <Route
        path="/delivery-problems"
        exact
        component={DeliveryProblems}
        isPrivate
      />

      <Route
        path="/recipients/edit/:id"
        exact
        component={RecipientsEdit}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/edit/:id"
        exact
        component={DeliveriesEdit}
        isPrivate
      />
      <Route
        path="/delivery/register"
        exact
        component={DeliveriesRegister}
        isPrivate
      />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/edit/:id"
        exact
        component={DeliverymanEdit}
        isPrivate
      />
      <Route
        path="/deliverymen/register"
        exact
        component={DeliverymanRegister}
        isPrivate
      />

      {/* <Route path="/" component={() => <h1>Página Não Encontrada 404</h1>} /> */}
    </Switch>
  );
}
