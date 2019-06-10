import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-loader-spinner';
import './Loader.scss';

const Loader = ({ isLoading }) =>
  isLoading ? (
    <div className="loader">
      <Spinner type="Triangle" height="100" width="100" color="#222" />
    </div>
  ) : null;

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps)(Loader);
