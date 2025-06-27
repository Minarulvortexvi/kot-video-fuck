import React, { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { motion } from 'framer-motion';

function Notification() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = React.useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('notification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    axios.get('http://localhost:5000/api/notifications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setNotifications(res.data));

    return () => socket.disconnect();
  }, []);

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto bg-white rounded shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{t('notifications')}</h2>
      {notifications.map(notification => (
        <div key={notification._id} className="border p-2 mb-2">
          <p>{notification.message}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default Notification;
