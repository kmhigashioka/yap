import React from 'react';
import { Snackbar } from '@material-ui/core';
import { TNotificationContext } from './types';

export const NotificationContext = React.createContext<
  TNotificationContext | undefined
>(undefined);

NotificationContext.displayName = 'NotificationContext';

export const useNotificationContext = (): TNotificationContext => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationContext must be used within a NotificationProvider.',
    );
  }
  return context;
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const value = { snackbarMessage, setSnackbarMessage };

  function handleCloseSnackbar(): void {
    setSnackbarMessage('');
  }

  return (
    <NotificationContext.Provider value={value}>
      <>
        {children}
        <Snackbar
          autoHideDuration={6000}
          open={snackbarMessage !== ''}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
        />
      </>
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
