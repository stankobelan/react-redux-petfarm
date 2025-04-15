import React, { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../../redux/data/store';
import { removeNotification } from '../../../redux/reducer/commonSlice';

/**
 * Notifications component that displays toast messages
 * Uses Redux store to manage notification state
 */
const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.common.notifications);

  // Handle auto-hide notifications
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach(notification => {
      if (notification.autoHide) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration || 5000);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  // Map notification type to Bootstrap variant
  const getVariant = (type: string): string => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  // Get appropriate icon for notification type
  const getIcon = (type: string): string => {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle-fill';
      case 'error':
        return 'bi bi-exclamation-circle-fill';
      case 'warning':
        return 'bi bi-exclamation-triangle-fill';
      default:
        return 'bi bi-info-circle-fill';
    }
  };

  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          onClose={() => dispatch(removeNotification(notification.id))}
          bg={getVariant(notification.type)}
          className="mb-2"
        >
          <Toast.Header>
            <i className={`${getIcon(notification.type)} me-2`}></i>
            <strong className="me-auto">
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className={notification.type === 'error' ? 'text-white' : ''}>
            {notification.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Notifications;
