import React, { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Nav/NavBar';

const BaseLayout = ({ children }) => {
  const path = window.location.pathname;
  const [css, setCss] = useState(`baseLayout justify-start`);
  useEffect(() => {
    path === '/'
      ? setCss(`baseLayout justify-start`)
      : setCss(`baseLayout justify-between`);
  }, [path]);
  return (
    <div className={css}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
