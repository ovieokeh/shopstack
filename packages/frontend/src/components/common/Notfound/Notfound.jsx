import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../assets/404.svg';
import './Notfound.scss';

function Notfound() {
  window.document.title = '404 | Shop Stack';

  return (
    <div className="notfound">
      <img alt="404" src={Image} />
      <div className="main">
        <h3>Page Not Found</h3>
        <p>The page you&#39;re looking for doesn&#39;t exist or some other error occurred.</p>
        <Link to="/">Go back to safety!</Link>
      </div>
    </div>
  );
}

export default Notfound;
