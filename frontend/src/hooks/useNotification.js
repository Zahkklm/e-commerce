import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return {
    addNotification: context.addNotification,
    removeNotification: context.removeNotification,
    notifications: context.notifications
  };
};