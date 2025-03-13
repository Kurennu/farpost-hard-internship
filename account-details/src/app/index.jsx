import React from 'react';
import { AccountDetailsPage } from '../pages';

export const App = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>Платежи</h1>
      </header>
      <main className="main">
        <AccountDetailsPage />
      </main>
    </div>
  );
};