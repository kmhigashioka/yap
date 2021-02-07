import React from 'react';
import { NotificationProvider } from './NotificationContext';

interface NotificationProps {
  children: React.ReactNode;
}

const Notification = ({ children }: NotificationProps): React.ReactElement => (
  <NotificationProvider>{children}</NotificationProvider>
);

export default Notification;
