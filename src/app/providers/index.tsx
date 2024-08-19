import React, { lazy } from 'react';

const AuthProvider = lazy(() => import('@/app/providers/auth-provider'));
const AppProvider: React.FC = () => {
  return (
    <div>
      <AuthProvider />
    </div>
  );
};

export default AppProvider;
