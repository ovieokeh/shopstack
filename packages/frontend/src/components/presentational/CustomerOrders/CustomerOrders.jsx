import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrdersRequest, getOrderRequest } from '../../../actions/orderActions';
import { AlertDialog } from '..';
import './CustomerOrders.scss';

const CustomerOrders = ({ orders, getOrders, getOrder }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('selected order');

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const toggleAlert = () => setIsAlertOpen(!isAlertOpen);

  const buildOrderDetails = order => {
    return (
      <div className="order-details">
        <div className="order-summary">
          <div className="summary">
            <p>Ordered on:</p>
            <p>{new Date(order.details.created_on).toDateString()}</p>
          </div>

          <div className="summary">
            <p>Total amount:</p>
            <p>${order.details.total_amount}</p>
          </div>

          <div className="summary">
            <p>Number of items:</p>
            <p>{order.order.length}</p>
          </div>
        </div>

        <div className="order-items">
          <h3>Order items</h3>

          {order.order.map(item => (
            <div key={item.product_id} className="item">
              <div className="item-details">
                <small>Item</small>
                <small>{item.product_name}</small>
              </div>

              <div className="item-details">
                <small>Quantity</small>
                <small>{item.quantity}</small>
              </div>

              <div className="item-details">
                <small>Price</small>
                <small>${item.unit_cost}</small>
              </div>

              <div className="item-details">
                <small>Subtotal</small>
                <small>${item.subtotal}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleOrderClick = (id, details) => async () => {
    const order = await getOrder(id);
    setIsAlertOpen(true);
    setSelectedOrder(buildOrderDetails({ order, details: { ...details.order } }));
    // do something with order
  };

  const renderOrders = () => {
    if (!orders.length) return <p>No Orders yet</p>;

    return orders.map(order => (
      <div
        onClick={handleOrderClick(order.order_id, { order })}
        key={order.order_id}
        className="order"
      >
        <p>${order.total_amount}</p>
        <small>{new Date(order.created_on).toDateString()}</small>
      </div>
    ));
  };

  return (
    <div className="content orders-container">
      <h3>Orders</h3>
      {isAlertOpen && (
        <AlertDialog
          open={isAlertOpen}
          setOpen={toggleAlert}
          title="Order Details"
          content={selectedOrder}
          fullWidth={true}
          maxWidth="md"
        />
      )}
      {renderOrders()}
    </div>
  );
};

const mapStateToProps = state => ({
  orders: state.shop.orders,
});

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(getOrdersRequest()),
  getOrder: id => dispatch(getOrderRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerOrders);
