import React from 'react';
import { connect } from 'react-redux';
import {
  PrimaryCustomerDetails,
  CustomerAddressDetails,
  CustomerCreditCardDetails,
  CustomerOrders,
} from '../../presentational';
import './Profile.scss';

const Profile = props => {
  const { customer } = props;
  window.document.title = `${customer.name} | Shop Stack`;

  return (
    <div className="profile-container">
      <h2 className="ls-3 pd-10 uppercase center">My Account</h2>
      <hr />

      <div className="profile-details">
        <div className="content customer-details">
          <PrimaryCustomerDetails />

          <hr className="divider" />
          <CustomerAddressDetails />

          <hr className="divider" />
          <CustomerCreditCardDetails />
        </div>

        <CustomerOrders />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  customer: state.auth.customer,
});

export default connect(mapStateToProps)(Profile);
