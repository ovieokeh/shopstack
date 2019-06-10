import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { CheckoutForm } from '../../presentational';

const Pay = () => {
  window.document.title = 'Complete payment | Shop Stack';

  return (
    <StripeProvider apiKey="pk_test_UrBUzJWPNse3I03Bsaxh6WFX00r6rJ1YCq">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  );
};

export default Pay;
