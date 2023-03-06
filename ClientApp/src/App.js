import React, { Component, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

import BaseLayout from './components/Layouts/Base-Layout';
import './index.css';
import { currentUserContext } from './hooks/UserContext';
import axios from 'axios';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/Auth/current-user', {
        withCredentials: true,
      });

      const data = await response.data;
      console.log(data.userName === 'empty');
      if (data.userName === 'empty' || data.email === 'empty') {
        return setCurrentUser(null);
      }
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BaseLayout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            console.log({ element, ...rest });
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </BaseLayout>
    </currentUserContext.Provider>
  );
};

export default App;
